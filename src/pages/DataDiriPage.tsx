import { Avatar, Box, Button, Card, Chip, Divider, Stack, Typography } from "@mui/material";
import { DashboardLayout } from "../layouts";
import use_query from "@Hooks/api-use-query";
import type { ProfileUserDto } from "@Hooks/api-generated";

interface ReadonlyFieldProps {
  label: string;
  value?: string | number | null;
}

const is_profile_user_dto = (value: unknown): value is ProfileUserDto => {
  if (!value || typeof value !== "object") {
    return false;
  }

  const profile = value as Record<string, unknown>;
  return typeof profile.id_pegawai === "string" || typeof profile.nama === "string";
};

const extract_profile_data = (response: unknown): ProfileUserDto | undefined => {
  if (!response || typeof response !== "object") {
    return undefined;
  }

  const level1 = response as Record<string, unknown>;
  const level2 = typeof level1.data === "object" && level1.data !== null ? (level1.data as Record<string, unknown>) : undefined;
  const level3 = level2 && typeof level2.data === "object" && level2.data !== null ? (level2.data as Record<string, unknown>) : undefined;

  const candidates: unknown[] = [response, level1.data, level2?.data, level3?.data];
  return candidates.find(is_profile_user_dto);
};

const format_value = (value?: string | number | null) => {
  if (value === undefined || value === null || value === "") {
    return "-";
  }

  return String(value);
};

const gender_label = (value?: number) => {
  if (value === 1) {
    return "Laki-laki";
  }

  if (value === 2) {
    return "Perempuan";
  }

  return "-";
};

function ReadonlyField({ label, value }: ReadonlyFieldProps) {
  return (
    <Box
      sx={{
        border: "1px solid var(--border)",
        borderRadius: "10px",
        px: 1.5,
        py: 1.1,
        minHeight: 66,
        backgroundColor: "color-mix(in srgb, var(--muted) 38%, transparent)",
      }}
    >
      <Typography variant="caption" sx={{ color: "var(--muted-foreground)", display: "block", mb: 0.5 }}>
        {label}
      </Typography>
      <Typography variant="body2" sx={{ color: "var(--foreground)", fontWeight: 600, wordBreak: "break-word" }}>
        {format_value(value)}
      </Typography>
    </Box>
  );
}

function ReadonlySection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography
        variant="h6"
        sx={{
          color: "var(--foreground)",
          fontWeight: 700,
          fontSize: "1rem",
          mb: 1.2,
          letterSpacing: "-0.01em",
        }}
      >
        {title}
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" },
          gap: 1.2,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

function ProfileHeader({ profile }: { profile?: ProfileUserDto }) {
  const initials = (profile?.nama ?? "User")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((chunk) => chunk.charAt(0).toUpperCase())
    .join("");

  return (
    <Card
      sx={{
        borderRadius: "14px",
        p: { xs: 1.5, sm: 2 },
        border: "1px solid var(--border)",
        backgroundColor: "color-mix(in srgb, var(--primary) 10%, var(--card))",
        mb: 2.4,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <Avatar
          src={profile?.foto}
          sx={{
            width: 58,
            height: 58,
            border: "2px solid color-mix(in srgb, var(--primary) 32%, transparent)",
            backgroundColor: "var(--accent)",
            color: "var(--foreground)",
            fontWeight: 700,
          }}
        >
          {initials || "U"}
        </Avatar>

        <Box sx={{ minWidth: 0 }}>
          <Typography variant="h6" sx={{ color: "var(--foreground)", fontWeight: 700, mb: 0.2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {format_value(profile?.nama)}
          </Typography>
          <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
            <Chip label={`ID: ${format_value(profile?.id_pegawai)}`} size="small" />
            <Chip label="Read only" size="small" color="info" variant="outlined" />
          </Stack>
        </Box>
      </Box>
    </Card>
  );
}

export function DataDiriPage() {
  const profileQuery = use_query({
    api_tag: "profile",
    api_method: "getProfile",
    api_query: [],
  });

  const profileData = extract_profile_data(profileQuery.response);

  return (
    <DashboardLayout title="Data Diri">
      <Box sx={{ py: 2.5, px: { xs: 2, sm: 3 } }}>
        <Card
          sx={{
            borderRadius: "18px",
            border: "1px solid var(--border)",
            backgroundColor: "var(--card)",
            p: { xs: 2.5, sm: 3.5 },
            boxShadow: "0 14px 28px rgba(15, 23, 42, 0.05)",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: "var(--foreground)",
              fontWeight: 700,
              mb: 0.75,
              letterSpacing: "-0.02em",
            }}
          >
            Data Diri
          </Typography>
          <Typography variant="body2" sx={{ color: "var(--muted-foreground)", mb: 3.2 }}>
            Halaman ini menampilkan data profil dari endpoint getProfile. Mode edit belum diaktifkan.
          </Typography>

          <ProfileHeader profile={profileData} />

          {profileQuery.is_loading && (
            <Typography variant="body2" sx={{ color: "var(--muted-foreground)", mb: 2 }}>
              Memuat data profil...
            </Typography>
          )}

          {!profileQuery.is_loading && !profileData && (
            <Card sx={{ p: 2, borderRadius: "12px", border: "1px dashed var(--border)", backgroundColor: "color-mix(in srgb, var(--muted) 55%, transparent)" }}>
              <Typography variant="body2" sx={{ color: "var(--muted-foreground)" }}>
                Data profil belum tersedia.
              </Typography>
            </Card>
          )}

          {profileData && (
            <>
              <ReadonlySection title="Profil Dasar">
                <ReadonlyField label="ID Pegawai" value={profileData.id_pegawai} />
                <ReadonlyField label="Nama Lengkap" value={profileData.nama} />
                <ReadonlyField label="Tempat Lahir" value={profileData.tempat_lahir} />
                <ReadonlyField label="Tanggal Lahir" value={profileData.tgl_lahir} />
                <ReadonlyField label="Jenis Kelamin" value={gender_label(profileData.jenis_kelamin)} />
                <ReadonlyField label="Agama" value={profileData.agama} />
              </ReadonlySection>

              <Divider sx={{ my: 2 }} />

              <ReadonlySection title="Alamat KTP">
                <ReadonlyField label="Provinsi" value={profileData.provinsi} />
                <ReadonlyField label="Kota" value={profileData.kota} />
                <ReadonlyField label="Kecamatan" value={profileData.kecamatan} />
                <ReadonlyField label="Kelurahan" value={profileData.kelurahan} />
                <ReadonlyField label="RT" value={profileData.rt} />
                <ReadonlyField label="RW" value={profileData.rw} />
                <ReadonlyField label="Kode Pos" value={profileData.kode_pos} />
                <ReadonlyField label="Alamat" value={profileData.alamat} />
              </ReadonlySection>

              <Divider sx={{ my: 2 }} />

              <ReadonlySection title="Alamat Domisili">
                <ReadonlyField label="Provinsi Domisili" value={profileData.provinsi_dom} />
                <ReadonlyField label="Kota Domisili" value={profileData.kota_dom} />
                <ReadonlyField label="Kecamatan Domisili" value={profileData.kecamatan_dom} />
                <ReadonlyField label="Kelurahan Domisili" value={profileData.kelurahan_dom} />
                <ReadonlyField label="RT Domisili" value={profileData.rt_dom} />
                <ReadonlyField label="RW Domisili" value={profileData.rw_dom} />
                <ReadonlyField label="Kode Pos Domisili" value={profileData.kode_pos_dom} />
                <ReadonlyField label="Alamat Domisili" value={profileData.alamat_dom} />
              </ReadonlySection>

              <Divider sx={{ my: 2 }} />

              <ReadonlySection title="Kependudukan">
                <ReadonlyField label="No. KTP" value={profileData.no_ktp} />
                <ReadonlyField label="No. KK" value={profileData.no_kk} />
                <ReadonlyField label="NPWP" value={profileData.npwp} />
                <ReadonlyField label="Nama Ibu" value={profileData.nama_ibu} />
              </ReadonlySection>

              <Divider sx={{ my: 2 }} />

              <ReadonlySection title="Kontak & Rekening">
                <ReadonlyField label="Email Institusi" value={profileData.email} />
                <ReadonlyField label="Email Pribadi" value={profileData.email_pribadi} />
                <ReadonlyField label="No. Telp" value={profileData.no_telp} />
                <ReadonlyField label="No. HP" value={profileData.no_hp} />
                <ReadonlyField label="No. Rekening" value={profileData.no_rekening} />
                <ReadonlyField label="No. Rekening BPR" value={profileData.no_rekening_bpr} />
                <ReadonlyField label="No. Rekening DKI" value={profileData.no_rekening_dki} />
              </ReadonlySection>
            </>
          )}

          <Box sx={{ mt: 2.5, display: "flex", justifyContent: "flex-end", gap: 1.2 }}>
            <Button variant="outlined" onClick={profileQuery.call_back} disabled={profileQuery.is_loading}>
              Refresh Data
            </Button>
          </Box>
        </Card>
      </Box>
    </DashboardLayout>
  );
}

export default DataDiriPage;
