import { ReactNode } from "react";

export type Event = {
  preventDefault: () => void;
};

export type Product = {
  id: number;
  name: string;
  price: number;
};

export type Children = {
  children: ReactNode[] | JSX.Element;
  className?: string;
  config?: {};
};
