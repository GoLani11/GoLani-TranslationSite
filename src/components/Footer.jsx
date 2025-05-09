import {
  LogoSection,
  NavLinks,
  ContactInfo,
  Copyright
} from './footer/index';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 로고 및 설명 */}
          <LogoSection />

          {/* 네비게이션 링크 */}
          <NavLinks />

          {/* 연락처 */}
          <ContactInfo />
        </div>

        {/* 저작권 */}
        <Copyright />
      </div>
    </footer>
  );
};

export default Footer; 