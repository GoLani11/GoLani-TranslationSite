import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL과 Anon Key가 환경변수에 설정되어 있지 않습니다. .env 파일을 확인하세요.');
}

export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
);

// 실시간 구독 채널 설정 예시
export const setupRealtimeSubscription = (tableNames, callback) => {
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
    return await supabase.auth.signUp({ email, password });
  },
  signIn: async ({ email, password }) => {
    return await supabase.auth.signInWithPassword({ email, password });
  },
  signOut: async () => {
    return await supabase.auth.signOut();
  },
  getCurrentUser: async () => {
    return await supabase.auth.getUser();
  },
  onAuthStateChange: (callback) => {
    return supabase.auth.onAuthStateChange(callback);
  }
};

// 기본 CRUD 헬퍼 함수
export const crud = {
  getItem: async (table, id) => {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq('id', id)
      .single();
    return { data, error };
  },
  
  getItems: async (table, query = {}) => {
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
    const { data, error } = await supabase
      .from(table)
      .insert(item)
      .select()
      .single();
    return { data, error };
  },
  
  updateItem: async (table, id, updates) => {
    const { data, error } = await supabase
      .from(table)
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    return { data, error };
  },
  
  deleteItem: async (table, id) => {
    const { error } = await supabase
      .from(table)
      .delete()
      .eq('id', id);
    return { error };
  }
}; 