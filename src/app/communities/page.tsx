import { CommunitiesView } from "@/views/communities";
import { GetCommunities } from "../services/community";
import { redirect } from "next/navigation";
import { APP_LINKS } from "@/contants/app-links";

export default async function CommunitiesHomePage() {
  const { data } = await GetCommunities();
  console.log("COMMUNIYIOES", data);
  switch (true) {
    case data?.communities.length === 0 && data.merchants.length === 0:
      redirect(APP_LINKS.COMMUNITY_NOT_FOUND);
    case data?.communities.length === 0 && data.merchants.length > 0:
      redirect(APP_LINKS.CREATE_COMMUNITY);
  }

  return <CommunitiesView communities={data?.communities || []} />;
}
