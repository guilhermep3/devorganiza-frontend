type props = {
  text: string;
}
export const EmptyChart = ({ text }: props) => {

  return (
    <div className="p-6 border rounded-lg bg-card flex items-center justify-center min-h-[300px]">
      <p className="text-gray-50 text-center">
        Nenhum dado de {text} disponível
      </p>
    </div>
  )
}