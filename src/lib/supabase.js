import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const isSupabaseInitialized = supabaseUrl && supabaseAnonKey;

if (!isSupabaseInitialized) {
  console.error('Supabase URL과 Anon Key가 환경변수에 설정되어 있지 않습니다. .env 파일을 확인하세요.');
}

export const supabase = isSupabaseInitialized
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// 실시간 구독 채널 설정 예시
export const setupRealtimeSubscription = (tableNames, callback) => {
  if (!isSupabaseInitialized) {
    console.warn('Supabase가 초기화되지 않아 실시간 구독을 설정할 수 없습니다.');
    return () => {}; // 더미 정리 함수 반환
  }
  const channels = tableNames.map(tableName => {
    return supabase
      .channel(`public:${tableName}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: tableName
      }, (payload) => {
        callback(payload);
      })
      .subscribe();
  });

  return () => {
    channels.forEach(channel => supabase.removeChannel(channel));
  };
};

// 인증 관련 헬퍼 함수
export const auth = {
  signUp: async ({ email, password }) => {
    if (!isSupabaseInitialized) {
      console.warn('Supabase가 초기화되지 않아 회원가입을 할 수 없습니다.');
      return { data: null, error: new Error('Supabase is not initialized. Check environment variables.') };
    }
    return await supabase.auth.signUp({ email, password });
  },
  signIn: async ({ email, password }) => {
    if (!isSupabaseInitialized) {
      console.warn('Supabase가 초기화되지 않아 로그인을 할 수 없습니다.');
      return { data: null, error: new Error('Supabase is not initialized. Check environment variables.') };
    }
    return await supabase.auth.signInWithPassword({ email, password });
  },
  signOut: async () => {
    if (!isSupabaseInitialized) {
      console.warn('Supabase가 초기화되지 않아 로그아웃을 할 수 없습니다.');
      return { error: new Error('Supabase is not initialized. Check environment variables.') };
    }
    return await supabase.auth.signOut();
  },
  getCurrentUser: async () => {
    if (!isSupabaseInitialized) {
      console.warn('Supabase가 초기화되지 않아 사용자 정보를 가져올 수 없습니다.');
      return { data: { user: null }, error: new Error('Supabase is not initialized. Check environment variables.') };
    }
    return await supabase.auth.getUser();
  },
  onAuthStateChange: (callback) => {
    if (!isSupabaseInitialized) {
      console.warn('Supabase가 초기화되지 않아 인증 상태 변화를 감지할 수 없습니다.');
      // Supabase의 onAuthStateChange와 유사한 형태로 더미 함수 반환
      const unsubscribe = () => {}; // 아무것도 하지 않는 함수
      return { data: { subscriptionId: null }, unsubscribe };
    }
    return supabase.auth.onAuthStateChange(callback);
  }
};

// 기본 CRUD 헬퍼 함수
export const crud = {
  getItem: async (table, id) => {
    if (!isSupabaseInitialized) {
      console.warn(`Supabase가 초기화되지 않아 ${table} 테이블에서 항목을 가져올 수 없습니다.`);
      return { data: null, error: new Error('Supabase is not initialized. Check environment variables.') };
    }
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq('id', id)
      .single();
    return { data, error };
  },

  getItems: async (table, query = {}) => {
    if (!isSupabaseInitialized) {
      console.warn(`Supabase가 초기화되지 않아 ${table} 테이블에서 항목 목록을 가져올 수 없습니다.`);
      return { data: null, error: new Error('Supabase is not initialized. Check environment variables.'), count: 0 };
    }
    let queryBuilder = supabase.from(table).select('*');

    // 필터 적용
    if (query.filters) {
      Object.entries(query.filters).forEach(([key, value]) => {
        if (value !== undefined) {
          queryBuilder = queryBuilder.eq(key, value);
        }
      });
    }

    // 정렬 적용
    if (query.orderBy) {
      queryBuilder = queryBuilder.order(query.orderBy.column, {
        ascending: query.orderBy.ascending
      });
    }

    // 페이지네이션 적용
    if (query.pagination) {
      const { page, pageSize } = query.pagination;
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;
      queryBuilder = queryBuilder.range(from, to);
    }

    const { data, error, count } = await queryBuilder;
    return { data, error, count };
  },

  createItem: async (table, item) => {
    if (!isSupabaseInitialized) {
      console.warn(`Supabase가 초기화되지 않아 ${table} 테이블에 항목을 생성할 수 없습니다.`);
      return { data: null, error: new Error('Supabase is not initialized. Check environment variables.') };
    }
    const { data, error } = await supabase
      .from(table)
      .insert(item)
      .select()
      .single();
    return { data, error };
  },

  updateItem: async (table, id, updates) => {
    if (!isSupabaseInitialized) {
      console.warn(`Supabase가 초기화되지 않아 ${table} 테이블의 항목을 업데이트할 수 없습니다.`);
      return { data: null, error: new Error('Supabase is not initialized. Check environment variables.') };
    }
    const { data, error } = await supabase
      .from(table)
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    return { data, error };
  },

  deleteItem: async (table, id) => {
    if (!isSupabaseInitialized) {
      console.warn(`Supabase가 초기화되지 않아 ${table} 테이블의 항목을 삭제할 수 없습니다.`);
      return { error: new Error('Supabase is not initialized. Check environment variables.') };
    }
    const { error } = await supabase
      .from(table)
      .delete()
      .eq('id', id);
    return { error };
  }
}; 