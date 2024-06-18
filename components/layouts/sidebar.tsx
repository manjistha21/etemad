"use client";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { toggleSidebar } from "@/store/themeConfigSlice";
import AnimateHeight from "react-animate-height";
import { IRootState } from "@/store";
import { useState, useEffect } from "react";
import IconCaretsDown from "@/components/icon/icon-carets-down";
import IconMenuDashboard from "@/components/icon/menu/icon-menu-dashboard";
import IconCaretDown from "@/components/icon/icon-caret-down";
import IconMinus from "@/components/icon/icon-minus";
import IconMenuChat from "@/components/icon/menu/icon-menu-chat";
import IconMenuMailbox from "@/components/icon/menu/icon-menu-mailbox";
import IconMenuTodo from "@/components/icon/menu/icon-menu-todo";
import IconMenuNotes from "@/components/icon/menu/icon-menu-notes";
import IconMenuScrumboard from "@/components/icon/menu/icon-menu-scrumboard";
import IconMenuContacts from "@/components/icon/menu/icon-menu-contacts";
import IconMenuInvoice from "@/components/icon/menu/icon-menu-invoice";
import IconMenuCalendar from "@/components/icon/menu/icon-menu-calendar";
import IconMenuComponents from "@/components/icon/menu/icon-menu-components";
import IconMenuElements from "@/components/icon/menu/icon-menu-elements";
import IconMenuCharts from "@/components/icon/menu/icon-menu-charts";
import IconMenuWidgets from "@/components/icon/menu/icon-menu-widgets";
import IconMenuFontIcons from "@/components/icon/menu/icon-menu-font-icons";
import IconMenuDragAndDrop from "@/components/icon/menu/icon-menu-drag-and-drop";
import IconMenuTables from "@/components/icon/menu/icon-menu-tables";
import IconMenuDatatables from "@/components/icon/menu/icon-menu-datatables";
import IconMenuForms from "@/components/icon/menu/icon-menu-forms";
import IconMenuUsers from "@/components/icon/menu/icon-menu-users";
import IconMenuPages from "@/components/icon/menu/icon-menu-pages";
import IconMenuAuthentication from "@/components/icon/menu/icon-menu-authentication";
import IconMenuDocumentation from "@/components/icon/menu/icon-menu-documentation";
import { usePathname } from "next/navigation";
import { getTranslation } from "@/i18n";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { t } = getTranslation();
  const pathname = usePathname();
  const [currentMenu, setCurrentMenu] = useState<string>("");
  const [errorSubMenu, setErrorSubMenu] = useState(false);
  const themeConfig = useSelector((state: IRootState) => state.themeConfig);
  const semidark = useSelector(
    (state: IRootState) => state.themeConfig.semidark
  );
  const toggleMenu = (value: string) => {
    setCurrentMenu((oldValue) => {
      return oldValue === value ? "" : value;
    });
  };

  useEffect(() => {
    const selector = document.querySelector(
      '.sidebar ul a[href="' + window.location.pathname + '"]'
    );
    if (selector) {
      selector.classList.add("active");
      const ul: any = selector.closest("ul.sub-menu");
      if (ul) {
        let ele: any =
          ul.closest("li.menu").querySelectorAll(".nav-link") || [];
        if (ele.length) {
          ele = ele[0];
          setTimeout(() => {
            ele.click();
          });
        }
      }
    }
  }, []);

  useEffect(() => {
    setActiveRoute();
    if (window.innerWidth < 1024 && themeConfig.sidebar) {
      dispatch(toggleSidebar());
    }
  }, [pathname]);

  const setActiveRoute = () => {
    let allLinks = document.querySelectorAll(".sidebar ul a.active");
    for (let i = 0; i < allLinks.length; i++) {
      const element = allLinks[i];
      element?.classList.remove("active");
    }
    const selector = document.querySelector(
      '.sidebar ul a[href="' + window.location.pathname + '"]'
    );
    selector?.classList.add("active");
  };

  return (
    <div className={semidark ? "dark" : ""}>
      <nav
        className={`sidebar fixed bottom-0 top-0 z-50 h-full min-h-screen w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-all duration-300 ${
          semidark ? "text-white-dark" : ""
        }`}
      >
        <div className="h-full bg-white dark:bg-black">
          <div className="flex items-center justify-between px-4 py-3">
            <Link href="/" className="main-logo flex shrink-0 items-center">
              <img
                className="ml-[5px] w-20 flex-none"
                src="/assets/images/logo.png"
                alt="logo"
              />
              <span className="align-middle text-2xl font-semibold dark:text-white-light lg:inline ltr:ml-1.5 rtl:mr-1.5">
                ETEMAD
              </span>
            </Link>

            <button
              type="button"
              className="collapse-icon flex h-8 w-8 items-center rounded-full transition duration-300 hover:bg-gray-500/10 dark:text-white-light dark:hover:bg-dark-light/10 rtl:rotate-180"
              onClick={() => dispatch(toggleSidebar())}
            >
              <IconCaretsDown className="m-auto rotate-90" />
            </button>
          </div>
          <PerfectScrollbar className="relative h-[calc(100vh-80px)]">
            <ul className="relative space-y-0.5 p-4 py-0 font-semibold">
              <h2 className="-mx-4 mb-1 flex items-center bg-white-light/30 px-7 py-3 font-extrabold uppercase dark:bg-dark dark:bg-opacity-[0.08]">
                <IconMenuUsers className="hidden h-5 w-4 flex-none" />
                <span>{t("Customers")}</span>
              </h2>

              <li className="nav-item">
                <ul>
                  <li className="nav-item">
                    <Link href="/customer" className="group">
                      <div className="flex items-center">
                        <IconMenuUsers className="shrink-0 group-hover:!text-primary" />
                        <span className="text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">
                          {t("Customers")}
                        </span>
                      </div>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/document" className="group">
                      <div className="flex items-center">
                        <IconMenuDocumentation className="shrink-0 group-hover:!text-primary" />
                        <span className="text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">
                          {t("Documents")}
                        </span>
                      </div>
                    </Link>
                  </li>
                </ul>
              </li>

              <h2 className="-mx-4 mb-1 flex items-center bg-white-light/30 px-7 py-3 font-extrabold uppercase dark:bg-dark dark:bg-opacity-[0.08]">
                <IconMinus className="hidden h-5 w-4 flex-none" />
                <span>{t("Transfer Orders")}</span>
              </h2>

              <li className="menu nav-item">
                <Link href="/addorder" className="group">
                  <div className="flex items-center">
                    <IconMenuCharts className="shrink-0 group-hover:!text-primary" />
                    <span className="text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">
                      {t("Add New Order")}
                    </span>
                  </div>
                </Link>
              </li>

              <li className="menu nav-item">
                <Link href="/pendingorders" className="group">
                  <div className="flex items-center">
                    <IconMenuWidgets className="shrink-0 group-hover:!text-primary" />
                    <span className="text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">
                      {t("Pending Orders")}
                    </span>
                  </div>
                </Link>
              </li>

              <li className="menu nav-item">
                <Link href="/inprogressorders" className="group">
                  <div className="flex items-center">
                    <IconMenuFontIcons className="shrink-0 group-hover:!text-primary" />
                    <span className="text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">
                      {t("In Progress Orders")}
                    </span>
                  </div>
                </Link>
              </li>

              <li className="menu nav-item">
                <Link href="/completedorders" className="group">
                  <div className="flex items-center">
                    <IconMenuDragAndDrop className="shrink-0 group-hover:!text-primary" />
                    <span className="text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">
                      {t("Completed  Orders")}
                    </span>
                  </div>
                </Link>
              </li>

              <li className="menu nav-item">
                <Link href="/allorders" className="group">
                  <div className="flex items-center">
                    <IconMenuDragAndDrop className="shrink-0 group-hover:!text-primary" />
                    <span className="text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">
                      {t("All Transfer Orders")}
                    </span>
                  </div>
                </Link>
              </li>

              <h2 className="-mx-4 mb-1 flex items-center bg-white-light/30 px-7 py-3 font-extrabold uppercase dark:bg-dark dark:bg-opacity-[0.08]">
                <IconMinus className="hidden h-5 w-4 flex-none" />
                <span>{t("Rates")}</span>
              </h2>

              <li className="menu nav-item">
                <Link href="/rate" className="group">
                  <div className="flex items-center">
                    <IconMenuTables className="shrink-0 group-hover:!text-primary" />
                    <span className="text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">
                      {t("Transfer Rates")}
                    </span>
                  </div>
                </Link>
              </li>

              <h2 className="-mx-4 mb-1 flex items-center bg-white-light/30 px-7 py-3 font-extrabold uppercase dark:bg-dark dark:bg-opacity-[0.08]">
                <IconMenuDatatables className="hidden h-5 w-4 flex-none" />
                <span>{t("Reports")}</span>
              </h2>
              <li className="nav-item">
                <Link href="/reports" className="group">
                  <div className="flex items-center">
                    <IconMenuDatatables className="shrink-0 group-hover:!text-primary" />
                    <span className="text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">
                      {t("All Reports")}
                    </span>
                  </div>
                </Link>
              </li>
            </ul>
          </PerfectScrollbar>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
