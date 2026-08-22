export default async function CategoryPage({ params }: { params: { slug: string } }) {
  // هون عم نقرأ اسم القسم اللي انكبس من الرابط (مثلا cafes أو restaurants)
  const { slug } = await params;

  return (
    <main className="min-h-screen bg-cream p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* بنخلي العنوان يتغير حسب القسم */}
        <h1 className="text-2xl sm:text-3xl font-bold text-[#6b4e3d] mb-3 sm:mb-4 capitalize">
          {slug} Places
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mb-6 md:mb-8">
          Here is a list of the best {slug} available around you right now.
        </p>

        {/* هون لاحقاً فيكِ تحطي الكروت الخاصة بالقسم، مثلاً بنعرض محتوى مختلف شرطياً أو بنجيب البيانات */}
        
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {slug ==='cafes' &&(
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
            <p className="font-semibold text-sm sm:text-base">☕ تجميعة لأفضل المقاهي (Cafes List)</p>
          </div>
        )}

        {slug === 'restaurants' && (
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
            <p className="font-semibold text-sm sm:text-base">🍽️ تجميعة لأفضل المطاعم (Restaurants List)</p>
          </div>
        )}

        {/* إذا كان قسم تاني لسا ما خصصناله كروت خاصة */}
        {slug !== 'cafes' && slug !== 'restaurants' && (
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md col-span-full">
            <p className="font-semibold text-sm sm:text-base">✨ نتائح قسم الـ {slug}</p>
          </div>
        )}
        </div>
      </div>
    </main>
  );
}