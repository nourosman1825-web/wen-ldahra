export default async function CategoryPage({ params }: { params: { slug: string } }) {
  // هون عم نقرأ اسم القسم اللي انكبس من الرابط (مثلا cafes أو restaurants)
  const { slug } = await params;

  return (
    <main className="min-h-screen bg-cream p-8">
      <div className="max-w-7xl mx-auto">
        {/* بنخلي العنوان يتغير حسب القسم */}
        <h1 className="text-3xl font-bold text-[#6b4e3d] mb-4 capitalize">
          {slug} Places
        </h1>
        <p className="text-gray-600 mb-8">
          Here is a list of the best {slug} available around you right now.
        </p>

        {/* هون لاحقاً فيكِ تحطي الكروت الخاصة بالقسم، مثلاً بنعرض محتوى مختلف شرطياً أو بنجيب البيانات */}
        {slug === 'cafes' && (
          <div className="bg-white p-6 rounded-xl shadow-md">
            <p className="font-semibold">☕ تجميعة لأفضل المقاهي (Cafes List)</p>
          </div>
        )}

        {slug === 'restaurants' && (
          <div className="bg-white p-6 rounded-xl shadow-md">
            <p className="font-semibold">🍽️ تجميعة لأفضل المطاعم (Restaurants List)</p>
          </div>
        )}

        {/* إذا كان قسم تاني لسا ما خصصناله كروت خاصة */}
        {slug !== 'cafes' && slug !== 'restaurants' && (
          <div className="bg-white p-6 rounded-xl shadow-md">
            <p className="font-semibold">✨ نتائح قسم الـ {slug}</p>
          </div>
        )}
      </div>
    </main>
  );
}