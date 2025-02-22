import { useState } from "react";
import Modal from "./Modal";
import useModal from "./hooks/useModal";

type ApiResult<TData extends object> = {
  status: "success" | "error" | "fetching" | "idle";
  data?: TData;
};

type MyRecord<K extends string> = Record<K, string>;

type UseFetchingResult<
  TData extends object,
  TParams extends Record<string, any>,
  Bool extends boolean,
> = ApiResult<TData> & {
  params: TParams & Omit<Pagination<Bool>, "hasPagination">;
  handleChangeParams: (
    newParams: TParams & Omit<Pagination<Bool>, "hasPagination">,
  ) => void;
};

export type PaginationState = {
  offset: number;
  limit: number;
};

export type Pagination<Bool extends boolean> = Bool extends true
  ? {
      hasPagination: Bool;
    } & PaginationState
  : { hasPagination?: Bool };

export type UseFetchingArgs<
  T extends Omit<Record<string, any>, keyof PaginationState>,
  Bool extends boolean,
> = {
  hasPagination?: Bool;
  params: T & Omit<Pagination<Bool>, "hasPagination">;
};

type ParamsType<
  TArgs extends Record<string, any>,
  Bool extends boolean,
> = UseFetchingArgs<TArgs, Bool>["params"] &
  Omit<Pagination<Bool>, "hasPagination">;

export const useFetching = <
  TData extends object,
  TArgs extends Omit<Record<string, any>, keyof PaginationState>,
  Bool extends boolean = false,
>(
  args: UseFetchingArgs<TArgs, Bool>,
): UseFetchingResult<TData, UseFetchingArgs<TArgs, Bool>["params"], Bool> => {
  const [params, setParams] = useState<ParamsType<TArgs, Bool>>(() => {
    const { params, hasPagination, ...rest } = args;

    return {
      ...params,
      ...rest,
    };
  });

  const [result] = useState<ApiResult<TData>>({
    status: "idle",
  });

  return {
    ...result,
    params,
    handleChangeParams: (newParams) => {
      setParams((prev) => ({ ...prev, ...newParams }));
    },
  };
};

function App() {
  const [open, setOpen] = useState(false);

  const { show, destroy } = useModal();

  const { params } = useFetching({
    params: {
      name: "",
      age: 10,
    },
  });

  return (
    <>
      <button onClick={() => setOpen(!open)}>open modal component</button>
      <Modal title="Modal" open={open} onClose={() => setOpen(false)}>
        <button
          onClick={() =>
            show({
              title: "Modal",
              content: (
                <button
                  onClick={() =>
                    show({
                      title: "Nested Modal",
                      content: (
                        <div>
                          <p>Next Modal</p>
                          <button onClick={() => destroy()}>destroy</button>
                        </div>
                      ),
                    })
                  }
                >
                  open modal
                </button>
              ),
            })
          }
        >
          show additional component
        </button>
      </Modal>
      <button
        onClick={() =>
          show({
            title: "Modal",
            content: (
              <button
                onClick={() =>
                  show({
                    title: "Nested Modal",
                    content: (
                      <div>
                        <p>Next Modal</p>
                        <button onClick={() => destroy()}>destroy</button>
                      </div>
                    ),
                  })
                }
              >
                open modal
              </button>
            ),
          })
        }
      >
        open modal
      </button>
    </>
  );
}

export default App;
