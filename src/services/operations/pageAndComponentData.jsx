import { toast } from "react-hot-toast";
import { apiConnector } from '../apiConnector'
import { catalogEndpoint } from '../api'

export const getCatalogPageData = async (categoryId) => {
  const toastId = toast.loading("Loading...");
  let result = null;

  try {
    const response = await apiConnector("POST", catalogEndpoint.CATEGORY_PAGE_DETAILS_API, {
      categoryId,
    });

    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could not fetch category page data");
    }

    result = response?.data?.data || response?.data;
  } catch (error) {
    console.error("CATALOG PAGE DATA API ERROR....", error);
    toast.error(error?.message || "Could not fetch category page data");
    result = error?.response?.data || null;
  } finally {
    toast.dismiss(toastId);
  }

  return result;
};
