import {
  ChangePassword,
  DeleteAccount,
  Notifications,
} from "@/features/users/components/SettingsDetails"

const Settings = () => {
  return (
    <div className="space-y-6">
      <ChangePassword />
      <Notifications />
      <DeleteAccount />
    </div>
  )
}

export default Settings
