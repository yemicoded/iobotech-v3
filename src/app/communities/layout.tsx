import { CommunitiesLayoutWrapper } from "@/components/layouts/communities";
import { APP_LINKS } from "@/contants/app-links";
import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

interface Props {
  children?: React.ReactNode;
}
export default async function CommunitiesLayout({ children }: Props) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect(APP_LINKS.LOGIN);
  }

  return <CommunitiesLayoutWrapper>{children}</CommunitiesLayoutWrapper>;
}
