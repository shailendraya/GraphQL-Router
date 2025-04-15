const CircuitBreakerStates = {
  OPENED: "OPENED",
  CLOSED: "CLOSED",
  HALF: "HALF",
};

export class CircuitBreaker {
  state: string;
  failureCount: number;
  failureThreshold: number;
  resetAfter: number;
  timeout: number;

  constructor(options?: any) {
    this.state = CircuitBreakerStates.CLOSED;
    this.failureCount = 0;
    this.resetAfter = Date.now();
    this.failureThreshold = options?.failureThreshold ?? 5;
    this.timeout = options?.timeout ?? 5000;
  }

  async fire(request: () => Promise<any>) {
    if (this.state === CircuitBreakerStates.OPENED) {
      if (this.resetAfter <= Date.now()) {
        this.state = CircuitBreakerStates.HALF;
      } else {
        throw new Error(
          "Circuit is in open state right now. Please try again later."
        );
      }
    }
    try {
      const response = await request();
      if (!!response) return this.success(response);
      return this.failure(response.data);
    } catch (error: any) {
      return this.failure(error.message);
    }
  }

  success(data: any) {
    this.failureCount = 0;
    if (this.state === CircuitBreakerStates.HALF) {
      this.state = CircuitBreakerStates.CLOSED;
    }
    return data;
  }

  failure(data: any) {
    this.failureCount += 1;
    if (
      this.state === CircuitBreakerStates.HALF ||
      this.failureCount >= this.failureThreshold
    ) {
      this.state = CircuitBreakerStates.OPENED;
      this.resetAfter = Date.now() + this.timeout;
    }
    return data;
  }
}

export default CircuitBreaker;
