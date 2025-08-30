
const LandingPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Chào mừng đến với VR Project</h1>
        <p className="text-lg text-muted-foreground">
          Hệ thống quản lý du lịch ảo
        </p>
        <div className="space-x-4">
          <a
            href="/dang-nhap"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            Đăng nhập
          </a>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
