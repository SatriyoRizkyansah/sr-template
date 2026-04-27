import React from "react";
import {
  DashboardOutlined as DashboardIcon,
  PersonOutline as PersonOutlineIcon,
  AssignmentTurnedInOutlined as AssignmentTurnedInIcon,
  SchoolOutlined as SchoolIcon,
  Groups2Outlined as GroupsIcon,
  HistoryEduOutlined as HistoryEduIcon,
  EmojiEventsOutlined as EmojiEventsIcon,
  WorkspacePremiumOutlined as WorkspacePremiumIcon,
  HealthAndSafetyOutlined as HealthAndSafetyIcon,
  BadgeOutlined as BadgeIcon,
  ChecklistRtlOutlined as ChecklistRtlIcon,
  MenuBookOutlined as MenuBookIcon,
  EngineeringOutlined as EngineeringIcon,
  ApartmentOutlined as ApartmentIcon,
  FactCheckOutlined as FactCheckIcon,
  RuleOutlined as RuleIcon,
} from "@mui/icons-material";

export interface NavItem {
  title: string;
  icon: React.ReactNode;
  path: string;
  badge?: number | string;
}

export type MenuRole = "pegawai" | "admin";

export interface SidebarSection {
  key: string;
  title: string;
  abbreviation: string;
  items: NavItem[];
}

const normalize_label = (value: string): string => {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
};

export const resolve_menu_role_from_akses = (aksesLabel?: string): MenuRole => {
  const normalized = normalize_label(aksesLabel ?? "");

  if (normalized.includes("admin")) {
    return "admin";
  }

  return "pegawai";
};

export const get_role_home_path = (role: MenuRole): string => {
  if (role === "admin") {
    return "/admin/dashboard-statistik";
  }

  return "/pegawai/penugasan";
};

const profileItems: NavItem[] = [{ title: "Data Diri", icon: <PersonOutlineIcon fontSize="small" />, path: "/data-diri" }];

const pegawaiItems: NavItem[] = [
  { title: "Penugasan", icon: <AssignmentTurnedInIcon fontSize="small" />, path: "/pegawai/penugasan" },
  { title: "Pendidikan", icon: <SchoolIcon fontSize="small" />, path: "/pegawai/pendidikan" },
  { title: "Keluarga", icon: <GroupsIcon fontSize="small" />, path: "/pegawai/keluarga" },
  { title: "Riwayat Pendidikan", icon: <HistoryEduIcon fontSize="small" />, path: "/pegawai/riwayat-pendidikan" },
  { title: "Rekognisi", icon: <EmojiEventsIcon fontSize="small" />, path: "/pegawai/rekognisi" },
  { title: "Beasiswa S3", icon: <WorkspacePremiumIcon fontSize="small" />, path: "/pegawai/beasiswa-s3" },
  { title: "Data Asuransi SJG", icon: <HealthAndSafetyIcon fontSize="small" />, path: "/pegawai/data-asuransi-sjg" },
];

const adminItems: NavItem[] = [
  { title: "Dashboard Statistik", icon: <DashboardIcon fontSize="small" />, path: "/admin/dashboard-statistik" },
  { title: "Data Pegawai", icon: <BadgeIcon fontSize="small" />, path: "/admin/data-pegawai" },
  { title: "Data Penugasan", icon: <ChecklistRtlIcon fontSize="small" />, path: "/admin/data-penugasan" },
  { title: "Data Dosen", icon: <MenuBookIcon fontSize="small" />, path: "/admin/data-dosen" },
  { title: "Data Tendik", icon: <EngineeringIcon fontSize="small" />, path: "/admin/data-tendik" },
  { title: "Data TPA", icon: <ApartmentIcon fontSize="small" />, path: "/admin/data-tpa" },
  { title: "Rekognisi", icon: <EmojiEventsIcon fontSize="small" />, path: "/admin/rekognisi" },
  { title: "Approval Data Pegawai", icon: <FactCheckIcon fontSize="small" />, path: "/admin/approval-data-pegawai" },
  { title: "Approval Data Penugasan", icon: <RuleIcon fontSize="small" />, path: "/admin/approval-data-penugasan" },
];

const pegawaiSections: SidebarSection[] = [
  { key: "profile", title: "Profil", abbreviation: "P", items: profileItems },
  { key: "pegawai", title: "Menu Pegawai", abbreviation: "PG", items: pegawaiItems },
];

const adminSections: SidebarSection[] = [
  { key: "profile", title: "Profil", abbreviation: "P", items: profileItems },
  { key: "admin", title: "Menu Admin", abbreviation: "AD", items: adminItems },
];

export const get_sidebar_sections = (role: MenuRole): SidebarSection[] => {
  if (role === "admin") {
    return adminSections;
  }

  return pegawaiSections;
};
