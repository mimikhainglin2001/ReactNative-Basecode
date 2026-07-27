import AppHeader from "@/presentation/components/Header/AppHeader";
import AppScreen from "@/presentation/common/AppScreen";

import LogoutButton from "@/presentation/components/Button/LogoutButton";

export default function ProfileScreen() {
  return (
    <AppScreen>
      <AppHeader title="Profile" subtitle="Manage your account" />

      <LogoutButton />
    </AppScreen>
  );
}
