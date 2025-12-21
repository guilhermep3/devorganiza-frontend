import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { termsData } from "@/src/data/terms";

export default function Page() {

  return (
    <div>
      <Header noNav />
      <div className="text-center bg-main-10 pt-28 pb-20">
        <h1 className="h1Custom">Termos de serviço</h1>
      </div>
      <div className="flex flex-col mx-auto gap-10 max-w-2xl my-20">
        {termsData.map((i, index) => (
          <div className="flex flex-col gap-3">
            <h2 className="text-lg font-semibold"><span className="mr-3">{index + 1}.</span> {i.title}</h2>
            <p className="text-gray-50">{i.description}</p>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  )
}