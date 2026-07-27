import AppScreen from "@/presentation/common/AppScreen";
import AppText from "@/presentation/common/AppText";
import { AppCard } from "@/presentation/components";
import AppHeader from "@/presentation/components/Header/AppHeader";

export default function HomeScreen() {
  return (
    <AppScreen>
      <AppHeader title="Dashboard" subtitle="Welcome back" />
      <AppCard>
        <AppText>Welcome back</AppText>
      </AppCard>
    </AppScreen>
  );
}
