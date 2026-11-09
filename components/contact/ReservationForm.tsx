"use client";

import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { site, whatsappLink } from "@/lib/site";
import { formatLongDate } from "@/lib/utils";

type FormState = {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  notes: string;
};

const initialState: FormState = {
  name: "",
  phone: "",
  date: "",
  time: "19:00",
  guests: "2",
  notes: "",
};

const times = [
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
  "22:30",
];

export function ReservationForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [minimumDate, setMinimumDate] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const now = new Date();
    const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
    setMinimumDate(local.toISOString().slice(0, 10));
  }, []);

  const message = useMemo(() => {
    const lines = [
      "Olá! Gostaria de reservar uma mesa no Ecully Charbon.",
      "",
      `Nome: ${form.name || "—"}`,
      `Telefone: ${form.phone || "—"}`,
      `Data: ${formatLongDate(form.date) || "—"}`,
      `Horário: ${form.time}`,
      `Pessoas: ${form.guests}`,
    ];

    if (form.notes.trim()) {
      lines.push("", `Observações: ${form.notes.trim()}`);
    }

    return lines.join("\n");
  }, [form]);

  const update = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
    setSent(false);
  };

  const validate = () => {
    const next: Record<string, string> = {};
    if (form.name.trim().length < 2) {
      next.name = "Informe seu nome.";
    }
    if (form.phone.replace(/\D/g, "").length < 10) {
      next.phone = "Informe um telefone com DDD.";
    }
    if (!form.date) {
      next.date = "Escolha uma data.";
    }
    if (!form.time) {
      next.time = "Escolha um horário.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;
    setSent(true);
    window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
  };

  return (
    <div className="border border-linha bg-carvao-2 p-6 md:p-8">
      <div className="mb-7 flex items-start justify-between gap-6">
        <div>
          <p className="eyebrow mb-2 text-brasa">Reserva</p>
          <h2 className="display text-3xl md:text-4xl">Reserve sua mesa</h2>
        </div>
        <span className="mt-1 hidden rounded-full border border-linha px-3 py-1 text-[0.5rem] uppercase tracking-[0.18em] text-creme/55 sm:block">
          WhatsApp
        </span>
      </div>

      <form onSubmit={onSubmit} noValidate className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="reserva-nome"
              className="mb-1 block text-[0.58rem] uppercase tracking-[0.2em] text-creme/60"
            >
              Nome completo *
            </label>
            <input
              id="reserva-nome"
              name="name"
              autoComplete="name"
              value={form.name}
              onChange={(event) => update("name", event.target.value)}
              placeholder="Seu nome"
              aria-invalid={Boolean(errors.name)}
              className="field"
            />
            {errors.name ? (
              <p className="mt-1 text-[0.6rem] text-brasa">{errors.name}</p>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="reserva-telefone"
              className="mb-1 block text-[0.58rem] uppercase tracking-[0.2em] text-creme/60"
            >
              Telefone *
            </label>
            <input
              id="reserva-telefone"
              name="phone"
              type="tel"
              autoComplete="tel"
              value={form.phone}
              onChange={(event) => update("phone", event.target.value)}
              placeholder="(11) 99999-9999"
              aria-invalid={Boolean(errors.phone)}
              className="field"
            />
            {errors.phone ? (
              <p className="mt-1 text-[0.6rem] text-brasa">{errors.phone}</p>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="reserva-data"
              className="mb-1 block text-[0.58rem] uppercase tracking-[0.2em] text-creme/60"
            >
              Data *
            </label>
            <input
              id="reserva-data"
              name="date"
              type="date"
              min={minimumDate}
              value={form.date}
              onChange={(event) => update("date", event.target.value)}
              aria-invalid={Boolean(errors.date)}
              className="field"
            />
            {errors.date ? (
              <p className="mt-1 text-[0.6rem] text-brasa">{errors.date}</p>
            ) : null}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="reserva-horario"
                className="mb-1 block text-[0.58rem] uppercase tracking-[0.2em] text-creme/60"
              >
                Horário *
              </label>
              <select
                id="reserva-horario"
                name="time"
                value={form.time}
                onChange={(event) => update("time", event.target.value)}
                className="field"
              >
                {times.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="reserva-pessoas"
                className="mb-1 block text-[0.58rem] uppercase tracking-[0.2em] text-creme/60"
              >
                Pessoas
              </label>
              <select
                id="reserva-pessoas"
                name="guests"
                value={form.guests}
                onChange={(event) => update("guests", event.target.value)}
                className="field"
              >
                {["1", "2", "3", "4", "5", "6", "7", "8"].map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
                <option value="9 ou mais">9 ou mais</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          <label
            htmlFor="reserva-observacoes"
            className="mb-1 block text-[0.58rem] uppercase tracking-[0.2em] text-creme/60"
          >
            Observações
          </label>
          <textarea
            id="reserva-observacoes"
            name="notes"
            rows={3}
            value={form.notes}
            onChange={(event) => update("notes", event.target.value)}
            placeholder="Aniversário, restrição alimentar, preferência de mesa..."
            className="field resize-none"
          />
        </div>

        <div className="flex flex-col gap-4 border-t border-linha pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xs text-[0.6rem] leading-relaxed text-creme/55">
            Ao enviar, o WhatsApp abre com os dados preenchidos. A reserva é
            confirmada pela equipe.
          </p>
          <button type="submit" className="btn btn-primary shrink-0">
            Enviar pelo WhatsApp
          </button>
        </div>

        {sent ? (
          <div
            role="status"
            className="border border-brasa/40 bg-brasa/10 p-4 text-xs leading-relaxed text-creme/75"
          >
            Abrimos o WhatsApp com sua solicitação. Se a janela não abrir,{" "}
            <a
              href={whatsappLink(message)}
              target="_blank"
              rel="noreferrer"
              className="underline decoration-brasa underline-offset-4"
            >
              clique aqui
            </a>
            . Você também pode ligar para {site.phone}.
          </div>
        ) : null}
      </form>
    </div>
  );
}
