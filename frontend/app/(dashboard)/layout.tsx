"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  Users,
  FileText,
} from "lucide-react";
import { Package } from "lucide-react";
import { Truck } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { BarChart } from "lucide-react";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {

      if (event.key === "F1") {
        event.preventDefault();
        router.push("/companies");
      }

      if (event.key === "F2") {
        event.preventDefault();
        router.push("/dashboard");
      }

      if (event.key === "F3") {
        event.preventDefault();
        router.push("/customers");
      }

      if (event.key === "F8") {
        event.preventDefault();
        router.push("/sales");
      }

      if (event.key === "F9") {
        event.preventDefault();
        router.push("/purchase");
      }

      if (event.ctrlKey && event.key.toLowerCase() === "i") {
        event.preventDefault();
        router.push("/inventory");
      }

      if (event.ctrlKey && event.key.toLowerCase() === "r") {
        event.preventDefault();
        router.push("/reports");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [router]);

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white min-h-screen">
        <div className="p-6 border-b border-slate-700">
          <h1 className="text-3xl font-bold text-blue-400">
            SmartERP
          </h1>

          <p className="text-sm text-slate-400">
            Billing • Inventory • Accounts
          </p>
        </div>

        <ul className="p-4 space-y-2">
          <Link href="/dashboard">
            <li
              className={`p-2 rounded flex items-center gap-3 cursor-pointer ${pathname === "/dashboard"
                ? "bg-blue-600"
                : "hover:bg-slate-700"
                }`}
            >
              <LayoutDashboard size={20} />
              Dashboard
            </li>
          </Link>

          <Link href="/companies">
            <li
              className={`p-2 rounded flex items-center gap-3 cursor-pointer ${pathname === "/companies"
                ? "bg-blue-600"
                : "hover:bg-slate-700"
                }`}
            >
              <Building2 size={20} />
              Companies
            </li>
          </Link>

          <Link href="/customers">
            <li
              className={`p-2 rounded flex items-center gap-3 cursor-pointer ${pathname === "/customers"
                ? "bg-blue-600"
                : "hover:bg-slate-700"
                }`}
            >
              <Users size={20} />
              Customers
            </li>
          </Link>

          <Link href="/inventory">
            <li
              className={`p-2 rounded flex items-center gap-3 cursor-pointer ${pathname === "/inventory"
                ? "bg-blue-600 text-white"
                : "hover:bg-slate-700"
                }`}
            >
              <Package size={20} />
              Inventory
            </li>
          </Link>

          <Link href="/purchase">
            <li
              className={`p-2 rounded flex items-center gap-3 cursor-pointer ${pathname === "/purchase"
                ? "bg-blue-600 text-white"
                : "hover:bg-slate-700"
                }`}
            >
              <ShoppingCart size={20} />
              Purchase
            </li>
          </Link>

          <Link href="/sales">
            <li
              className={`p-2 rounded flex items-center gap-3 cursor-pointer ${pathname === "/sales"
                ? "bg-blue-600 text-white"
                : "hover:bg-slate-700"
                }`}
            >
              <BarChart size={20} />
              Sales
            </li>
          </Link>

          <Link href="/suppliers">
            <li
              className={`p-2 rounded flex items-center gap-3 cursor-pointer ${pathname === "/suppliers"
                ? "bg-blue-600 text-white"
                : "hover:bg-slate-700"
                }`}
            >
              <Truck size={20} />
              Suppliers
            </li>
          </Link>

          <Link href="/reports">
            <li
              className={`p-2 rounded flex items-center gap-3 cursor-pointer ${pathname === "/reports"
                ? "bg-blue-600"
                : "hover:bg-slate-700"
                }`}
            >
              <FileText size={20} />
              Reports
            </li>
          </Link>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-6">
        {children}
      </div>
    </div>
  );
}