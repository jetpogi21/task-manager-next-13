import { parseParams } from "@/utils/utils";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { URLSearchParams } from "url";

const useURL = <T>() => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams() as unknown as URLSearchParams;
  const query = parseParams(searchParams) as Partial<T>;

  return { router, pathname, query };
};

export { useURL };
