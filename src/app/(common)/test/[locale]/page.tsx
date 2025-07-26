import { fetchProductData } from '@/lib/api';
import React from 'react';

const page = async ({ params }: { params: { locale: string } }) => {
  const { locale } = await params

  const response = await fetchProductData("lang=en")
  const { data } = response
  console.log(data);
  return (
    <div>
      {/* Render your product data here */}
    </div>
  );
};

export default page;