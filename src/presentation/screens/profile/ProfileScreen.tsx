import React, { useEffect, useState } from "react";

import { View, StyleSheet, RefreshControl, ScrollView } from "react-native";

import AppHeader from "@/presentation/components/Header/AppHeader";
import AppScreen from "@/presentation/common/AppScreen";
import AppText from "@/presentation/common/AppText";
import AppCard from "@/presentation/components/Card/AppCard";
import AppAvatar from "@/presentation/components/Avatar/AppAvatar";
import AppButton from "@/presentation/components/Button/AppButton";
import AppMessage from "@/presentation/components/Error/AppMessage";
import LoadingView from "@/presentation/components/Loading/LoadingView";

import container, { profileViewModel } from "@/core/di/container";
import { AuthService } from "@/auth/services/auth.service";

import { UserEntity } from "@/domain/entities/user.entity";

import {
  Colors,
  Spacing,
  Typography,
  Radius,
} from "@/presentation/theme/theme";

export default function ProfileScreen() {
  const [user, setUser] = useState<UserEntity | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadProfile = async (isRefresh = false) => {
    try {
      if (!isRefresh) setLoading(true);
      setError(null);

      const result = await profileViewModel.getCurrentUser();
      if (!result.success) {
        setError(result.error ?? "Failed to load profile.");
        return;
      }
      setUser(result.data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to load profile.";
      setError(message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => loadProfile(true);

  const handleLogout = async () => {
    try {
      const service = container.resolve<AuthService>("AuthService");
      await service.logout();
    } catch {}
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const renderProfileContent = () => {
    if (!user) return null;

    return (
      <View style={styles.content}>
        <View style={styles.profileHeader}>
          <AppAvatar name={user.name} size={88} />

          <View style={styles.profileInfo}>
            <AppText type="title" style={styles.name}>
              {user.name}
            </AppText>
            <AppText type="body" style={styles.email}>
              {user.email}
            </AppText>
            <AppText type="caption" style={styles.userId}>
              ID: {user.id.slice(0, 8)}...
            </AppText>
          </View>
        </View>

        <View style={styles.section}>
          <AppText type="heading" style={styles.sectionTitle}>
            Account Settings
          </AppText>

          <AppCard style={styles.settingsCard}>
            <SettingsItem
              icon="person"
              title="Edit Profile"
              subtitle="Update your personal information"
              onPress={() => {}}
            />
            <Divider />
            <SettingsItem
              icon="lock"
              title="Change Password"
              subtitle="Update your password"
              onPress={() => {}}
            />
            <Divider />
            <SettingsItem
              icon="bell"
              title="Notifications"
              subtitle="Manage notification preferences"
              onPress={() => {}}
            />
            <Divider />
            <SettingsItem
              icon="shield"
              title="Privacy & Security"
              subtitle="Manage your privacy settings"
              onPress={() => {}}
            />
            <Divider />
            <SettingsItem
              icon="logout"
              title="Logout"
              subtitle="Sign out of your account"
              onPress={handleLogout}
              destructive
            />
          </AppCard>
        </View>
      </View>
    );
  };

  return (
    <AppScreen style={styles.screen}>
      <AppHeader title="Profile" subtitle="Manage your account settings" />

      {loading && (
        <View style={styles.loadingContainer}>
          <LoadingView size="large" />
          <AppText type="caption" style={styles.loadingText}>
            Loading profile...
          </AppText>
        </View>
      )}

      {error && (
        <AppMessage
          type="error"
          message={error}
          onRetry={onRefresh}
          style={styles.errorContainer}
        />
      )}

      {!loading && !error && (
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[Colors.primary]}
            />
          }
          showsVerticalScrollIndicator={false}
        >
          {renderProfileContent()}
        </ScrollView>
      )}
    </AppScreen>
  );
}

function SettingsItem({
  icon,
  title,
  subtitle,
  onPress,
  destructive = false,
}: {
  icon: string;
  title: string;
  subtitle: string;
  onPress: () => void;
  destructive?: boolean;
}) {
  return (
    <AppButton
      variant="ghost"
      fullWidth
      align="left"
      onPress={onPress}
      style={[
        styles.settingsItem,
        destructive && styles.settingsItemDestructive,
      ]}
    >
      <View style={styles.settingsItemLeft}>
        <View style={styles.iconWrapper}>
          <AppText type="body" style={styles.iconText}>
            {getIcon(icon)}
          </AppText>
        </View>
        <View style={styles.settingsItemText}>
          <AppText
            type="body"
            style={[
              styles.settingsItemTitle,
              destructive && styles.settingsItemTitleDestructive,
            ]}
          >
            {title}
          </AppText>
          <AppText
            type="caption"
            style={[
              styles.settingsItemSubtitle,
              destructive && styles.settingsItemSubtitleDestructive,
            ]}
          >
            {subtitle}
          </AppText>
        </View>
      </View>
      <AppText type="caption" style={styles.chevron}>
        ›
      </AppText>
    </AppButton>
  );
}

function Divider() {
  return <View style={styles.divider} />;
}

function getIcon(name: string): string {
  const icons: Record<string, string> = {
    person: "👤",
    lock: "🔒",
    bell: "🔔",
    shield: "🛡️",
    logout: "🚪",
  };
  return icons[name] || "•";
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Spacing.xl,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: Spacing.md,
  },
  loadingText: {
    color: Colors.textSecondary,
  },
  errorContainer: {
    marginTop: Spacing.md,
  },
  content: {
    gap: Spacing.xl,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  profileInfo: {
    flex: 1,
    gap: Spacing.xs,
  },
  name: {
    color: Colors.text,
  },
  email: {
    color: Colors.textSecondary,
  },
  userId: {
    color: Colors.textSecondary,
    opacity: 0.7,
  },
  section: {
    gap: Spacing.md,
  },
  sectionTitle: {
    color: Colors.text,
    paddingHorizontal: Spacing.sm,
  },
  settingsCard: {
    overflow: "hidden",
  },
  settingsItem: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },
  settingsItemDestructive: {
    backgroundColor: "transparent",
  },
  settingsItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
    flex: 1,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
    backgroundColor: Colors.surface,
    justifyContent: "center",
    alignItems: "center",
  },
  iconText: {
    fontSize: 18,
    lineHeight: 22,
  },
  settingsItemText: {
    flex: 1,
    gap: Spacing.xs,
  },
  settingsItemTitle: {
    color: Colors.text,
    fontWeight: "500",
  },
  settingsItemTitleDestructive: {
    color: Colors.error,
  },
  settingsItemSubtitle: {
    color: Colors.textSecondary,
    fontSize: 13,
  },
  settingsItemSubtitleDestructive: {
    color: Colors.error,
    opacity: 0.8,
  },
  chevron: {
    color: Colors.textSecondary,
    fontSize: 20,
    fontWeight: "300",
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginHorizontal: Spacing.lg,
  },
});
