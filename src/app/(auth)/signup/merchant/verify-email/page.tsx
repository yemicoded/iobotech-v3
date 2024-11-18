import { Text } from "@/components/shared/text";
import { View } from "@/components/shared/view";
import { APP_LINKS } from "@/contants/app-links";
import { EmailVerificationView } from "@/views/auth/verify-email";

export default function VerifyMerchantSignupEmailPage() {
  return (
    <EmailVerificationView
      header={
        <View className="flex flex-col gap-2">
          <Text className="font-semibold text-2xl text-gray-100">
            Enter OTP
          </Text>
          <Text className="font-medium text-base text-gray-300">
            An OTP was sent to your email address. Enter it below to change your
            password.{" "}
          </Text>
        </View>
      }
      callbackUrl={APP_LINKS.LOGIN}
    />
  );
}
