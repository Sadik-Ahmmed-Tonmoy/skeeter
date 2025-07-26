import type { ApiResponse } from "@/types/product";

export async function fetchProductData(locale: string): Promise<ApiResponse> {
  console.log(locale);
  try {
    const response = await fetch(
      `https://api.10minuteschool.com/discovery-service/api/v1/products/ielts-course?${locale}`,
      {
        headers: {
          "X-TENMS-SOURCE-PLATFORM": "web",
          accept: "application/json",
        },
        cache: "no-store", // For SSR
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch product data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching product data:", error);
    // Return fallback data with the correct structure
    return {
      code: 500,
      data: {
        slug: "ielts-course",
        id: 153,
        title: "IELTS Course",
        description: "<p>Complete IELTS preparation course</p>",
        platform: "skills",
        type: "regular",
        modality: "recorded",
        start_at: "",
        media: [],
        checklist: [],
        seo: [],
        cta_text: {
          name: "Buy Now",
          value: "enroll",
        },
        sections: [],
        is_cohort_based_course: false,
        secondary_cta_group: [],
        delivery_method: "pathao",
      },
      error: [],
      message: "Fallback data",
      payload: [],
      status_code: 500,
    };
  }
}
