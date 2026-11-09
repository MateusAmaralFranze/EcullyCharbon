import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-end overflow-hidden pb-16 pt-32 md:pb-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(228,87,46,0.12),transparent_60%)]" />
      <div className="shell relative">
        <p className="eyebrow mb-6">Erro 404</p>
        <h1 className="display text-[clamp(4rem,14vw,12rem)] leading-none">
          404
          <br />
          <span className="display-italic text-brasa">fora do cardápio.</span>
        </h1>
        <p className="mt-6 max-w-md text-sm leading-relaxed text-creme/55">
          A página que você procura não existe — ou saiu do menu. Mas o fogo
          continua aceso na página inicial.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="btn btn-primary">
            Voltar ao início
          </Link>
          <Link href="/cardapio" className="btn btn-ghost">
            Ver cardápio
          </Link>
        </div>
      </div>
    </section>
  );
}
