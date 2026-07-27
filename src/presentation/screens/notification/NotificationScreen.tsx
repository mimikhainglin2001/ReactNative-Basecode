import AppScreen from "@/presentation/common/AppScreen";

import AppEmpty from "@/presentation/common/AppEmpty";

import AppHeader from "@/presentation/components/Header/AppHeader";

export default function NotificationScreen() {
  return (
    <AppScreen>
      <AppHeader title="Notifications" />

      <AppEmpty
        title="No notifications"
        description="You don't have any notifications"
      />
    </AppScreen>
  );
}
