import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString("pt-BR");
}

export function formatNumber(value: number, decimals = 2) {
  return value.toLocaleString("pt-BR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function formatTCO2e(value: number) {
  return `${formatNumber(value)} tCO2e`;
}

export function getDeltaColor(delta: number) {
  if (delta < 0) return "text-green-600";
  if (delta > 0) return "text-red-600";
  return "text-gray-500";
}

export function getDeltaArrow(delta: number) {
  if (delta < 0) return "↓";
  if (delta > 0) return "↑";
  return "→";
}
