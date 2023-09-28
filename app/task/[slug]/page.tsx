export default function Page({ params }: { params: { slug: string } }) {
  return (
    <>
      <div className="my-16 text-center">
        <p className="text-2xl">
          Task <code className="font-mono font-bold">{params.slug}</code>
        </p>
      </div>
    </>
  );
}
