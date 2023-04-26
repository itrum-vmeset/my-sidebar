import React, { FunctionComponent } from "react";

import { menuItems } from "../../helpers/helpers";

import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import { LayoutProps } from "./Layout.props";

import styles from "./Layout.module.css";

function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <Header className={styles.header} />
      <Sidebar className={styles.sidebar} menuItems={menuItems} />
      <div className={styles.body}>{children}</div>
    </div>
  );
}

export const withLayout = <T extends Record<string, unknown>>(
  Component: FunctionComponent<T>
) => {
  return function withLayoutComponent(props: T): JSX.Element {
    return (
      <>
        <Layout>
          <Component {...props} />
        </Layout>
      </>
    );
  };
};
