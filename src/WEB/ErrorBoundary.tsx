import React from 'react';

interface State {
  hasError: boolean;
  error?: Error | null;
}

export default class ErrorBoundary extends React.Component<React.PropsWithChildren<{}>, State> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: any) {
    // 로그 남기기 (개발 중에만 콘솔에 출력)
    // 실제 프로덕션에서는 원격 로깅으로 보낼 수 있습니다.
    // eslint-disable-next-line no-console
    console.error('ErrorBoundary caught error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 24, textAlign: 'center', color: '#d4af6a' }}>
          <strong>오류가 발생했습니다.</strong>
          <div style={{ marginTop: 8 }}>{String(this.state.error)}</div>
        </div>
      );
    }

    return this.props.children;
  }
}
