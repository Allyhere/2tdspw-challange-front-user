import { Children, isValidElement, type ReactElement, type ReactNode } from "react";

type WhenProps<T> = {
  when: T | false | null | undefined;
  children: ReactNode | ((value: Exclude<T, false | null | undefined>) => ReactNode);
};

type OtherwiseProps = {
  children: ReactNode;
};

export function Show({ children }: { children: ReactNode }) {
  let fallback: ReactNode = null;
  for (const child of Children.toArray(children)) {
    if (!isValidElement(child)) continue;
    if (child.type === Otherwise) {
      fallback = child;
      continue;
    }
    if (isWhen(child) && isPresent(child.props.when)) return child;
  }
  return fallback;
}

function When<T>({ when, children }: WhenProps<T>) {
  if (!isPresent(when)) return null;
  if (typeof children === "function") return children(when);
  return children;
}

function Otherwise({ children }: OtherwiseProps) {
  return children;
}

Show.When = When;
Show.Otherwise = Otherwise;

function isWhen(child: ReactElement): child is ReactElement<WhenProps<unknown>> {
  return child.type === When;
}

function isPresent<T>(value: T | false | null | undefined): value is Exclude<T, false | null | undefined> {
  return value !== false && value !== null && value !== undefined;
}
