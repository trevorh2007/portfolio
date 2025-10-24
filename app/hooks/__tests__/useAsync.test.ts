import { act, renderHook } from "@testing-library/react";
import { useAsync, useLoading } from "../useAsync";

// Mock timer to avoid waiting in tests
jest.useFakeTimers();

describe("useAsync", () => {
  it("should handle successful async function", async () => {
    const mockAsyncFn = jest.fn().mockResolvedValue("success data");

    const { result } = renderHook(() => useAsync(mockAsyncFn));

    // Initially loading
    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(null);

    // Wait for async function to complete
    await act(async () => {
      jest.runAllTimers();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBe("success data");
    expect(result.current.error).toBe(null);
    expect(mockAsyncFn).toHaveBeenCalledTimes(1);
  });

  it("should handle async function errors", async () => {
    const mockError = new Error("Test error");
    const mockAsyncFn = jest.fn().mockRejectedValue(mockError);

    const { result } = renderHook(() => useAsync(mockAsyncFn));

    await act(async () => {
      jest.runAllTimers();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(mockError);
  });

  it("should refetch data when refetch is called", async () => {
    const mockAsyncFn = jest
      .fn()
      .mockResolvedValueOnce("first data")
      .mockResolvedValueOnce("second data");

    const { result } = renderHook(() => useAsync(mockAsyncFn));

    // Wait for initial load
    await act(async () => {
      jest.runAllTimers();
    });

    expect(result.current.data).toBe("first data");

    // Refetch
    await act(async () => {
      result.current.refetch();
      jest.runAllTimers();
    });

    expect(result.current.data).toBe("second data");
    expect(mockAsyncFn).toHaveBeenCalledTimes(2);
  });
});

describe("useLoading", () => {
  it("should initialize with correct initial state", () => {
    const { result } = renderHook(() => useLoading());

    expect(result.current.isLoading).toBe(false);
    expect(typeof result.current.startLoading).toBe("function");
    expect(typeof result.current.stopLoading).toBe("function");
    expect(typeof result.current.withLoading).toBe("function");
  });

  it("should initialize with custom initial state", () => {
    const { result } = renderHook(() => useLoading(true));

    expect(result.current.isLoading).toBe(true);
  });

  it("should start and stop loading", () => {
    const { result } = renderHook(() => useLoading());

    act(() => {
      result.current.startLoading();
    });

    expect(result.current.isLoading).toBe(true);

    act(() => {
      result.current.stopLoading();
    });

    expect(result.current.isLoading).toBe(false);
  });

  it("should handle withLoading for successful operations", async () => {
    const { result } = renderHook(() => useLoading());
    const mockAsyncFn = jest.fn().mockResolvedValue("test result");

    let promiseResult: string;

    await act(async () => {
      promiseResult = await result.current.withLoading(mockAsyncFn);
    });

    expect(promiseResult!).toBe("test result");
    expect(result.current.isLoading).toBe(false);
    expect(mockAsyncFn).toHaveBeenCalledTimes(1);
  });

  it("should handle withLoading for failed operations", async () => {
    const { result } = renderHook(() => useLoading());
    const mockError = new Error("Test error");
    const mockAsyncFn = jest.fn().mockRejectedValue(mockError);

    await act(async () => {
      try {
        await result.current.withLoading(mockAsyncFn);
      } catch (error) {
        expect(error).toBe(mockError);
      }
    });

    expect(result.current.isLoading).toBe(false);
  });
});
