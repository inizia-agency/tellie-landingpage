'use client';

import { useMemo, useState } from 'react';

const money = new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 });
const percent = new Intl.NumberFormat('en-AU', { style: 'percent', maximumFractionDigits: 0 });

function Field({ label, value, onChange, min, max, step = 1, suffix }: { label: string; value: number; onChange: (value: number) => void; min: number; max: number; step?: number; suffix?: string }) {
  return <label className="block"><span className="flex items-center justify-between gap-3 text-sm font-medium"><span>{label}</span><span className="text-[#007f7a]">{value}{suffix}</span></span><input type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} className="mt-3 w-full accent-[#007f7a]" /></label>;
}

export function FinancialCalculator() {
  const [residents, setResidents] = useState(200);
  const [activation, setActivation] = useState(70);
  const [familyAdoption, setFamilyAdoption] = useState(35);
  const [facilities, setFacilities] = useState(1);
  const [hours, setHours] = useState(8);

  const result = useMemo(() => {
    const activeResidents = Math.round(residents * activation / 100);
    const familyUsers = Math.round(activeResidents * familyAdoption / 100);
    const residentRevenue = residents * 45 * facilities;
    const dashboardRevenue = 400 * facilities;
    const familyRevenue = familyUsers * 25 * facilities;
    const monthlyRevenue = residentRevenue + dashboardRevenue + familyRevenue;
    const conversationCost = activeResidents * hours * 1.88 * facilities;
    const residentSupportCost = activeResidents * 5 * facilities;
    const familyDeliveryCost = familyUsers * 2 * facilities;
    const customerSuccessCost = 600 * facilities;
    const directCost = conversationCost + residentSupportCost + familyDeliveryCost + customerSuccessCost;
    const contribution = monthlyRevenue - directCost;
    return { activeResidents, familyUsers, residentRevenue, dashboardRevenue, familyRevenue, monthlyRevenue, conversationCost, residentSupportCost, familyDeliveryCost, customerSuccessCost, directCost, contribution, margin: monthlyRevenue > 0 ? contribution / monthlyRevenue : 0 };
  }, [residents, activation, familyAdoption, facilities, hours]);

  return <section className="mt-12 overflow-hidden rounded-3xl border border-stone-200 bg-white" aria-labelledby="calculator-title">
    <div className="grid lg:grid-cols-[.9fr_1.1fr]">
      <div className="p-6 sm:p-9">
        <p className="text-xs font-semibold uppercase tracking-[.16em] text-[#007f7a]">Illustrative account model</p>
        <h2 id="calculator-title" className="mt-3 text-3xl font-semibold tracking-[-.04em]">Explore one provider account</h2>
        <p className="mt-3 text-sm leading-6 text-stone-600">Adjust the operating assumptions to see how facility adoption, Family Connect and multi-site expansion affect recurring revenue.</p>
        <div className="mt-8 space-y-6">
          <Field label="Licensed residents per facility" value={residents} onChange={setResidents} min={40} max={500} step={10} />
          <Field label="Residents activated" value={activation} onChange={setActivation} min={10} max={100} step={5} suffix="%" />
          <Field label="Family Connect adoption" value={familyAdoption} onChange={setFamilyAdoption} min={0} max={100} step={5} suffix="%" />
          <Field label="Conversation hours per active resident" value={hours} onChange={setHours} min={2} max={30} />
          <Field label="Provider facilities" value={facilities} onChange={setFacilities} min={1} max={20} />
        </div>
      </div>
      <div className="bg-[#eaf5f4] p-6 sm:p-9">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl bg-white/85 p-5"><p className="text-xs text-stone-500">Monthly account revenue</p><p className="mt-2 text-3xl font-semibold tracking-[-.04em]">{money.format(result.monthlyRevenue)}</p></div>
          <div className="rounded-2xl bg-white/85 p-5"><p className="text-xs text-stone-500">Annualised account revenue</p><p className="mt-2 text-3xl font-semibold tracking-[-.04em]">{money.format(result.monthlyRevenue * 12)}</p></div>
          <div className="rounded-2xl bg-white/85 p-5"><p className="text-xs text-stone-500">Monthly gross contribution</p><p className={`mt-2 text-3xl font-semibold tracking-[-.04em] ${result.contribution < 0 ? 'text-[#a24d3b]' : ''}`}>{money.format(result.contribution)}</p></div>
          <div className="rounded-2xl bg-white/85 p-5"><p className="text-xs text-stone-500">Illustrative contribution margin</p><p className={`mt-2 text-3xl font-semibold tracking-[-.04em] ${result.margin < 0 ? 'text-[#a24d3b]' : ''}`}>{percent.format(result.margin)}</p></div>
        </div>
        <div className="mt-6 rounded-2xl bg-white p-5">
          <p className="text-sm font-semibold">Monthly revenue composition</p>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between gap-4"><dt className="text-stone-600">Resident licences · {residents * facilities}</dt><dd className="font-semibold">{money.format(result.residentRevenue)}</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-stone-600">Provider dashboards · {facilities}</dt><dd className="font-semibold">{money.format(result.dashboardRevenue)}</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-stone-600">Family Connect · {result.familyUsers * facilities} activations</dt><dd className="font-semibold">{money.format(result.familyRevenue)}</dd></div>
            <div className="flex justify-between gap-4 border-t border-stone-200 pt-3"><dt className="text-stone-600">Conversation infrastructure</dt><dd className="font-semibold">{money.format(result.conversationCost)}</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-stone-600">Resident support allowance</dt><dd className="font-semibold">{money.format(result.residentSupportCost)}</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-stone-600">Family-app delivery</dt><dd className="font-semibold">{money.format(result.familyDeliveryCost)}</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-stone-600">Facility customer success</dt><dd className="font-semibold">{money.format(result.customerSuccessCost)}</dd></div>
            <div className="flex justify-between gap-4 border-t border-stone-200 pt-3"><dt className="font-medium">Total estimated direct cost</dt><dd className="font-semibold">{money.format(result.directCost)}</dd></div>
          </dl>
        </div>
        <p className="mt-5 text-xs leading-5 text-stone-600">Working assumptions: A$45 per licensed resident/month, A$400 per facility dashboard/month, A$25 per Family Connect activation/month and approximately A$1.88 per conversation hour. Direct-cost allowances include A$5 per active resident, A$2 per family activation and A$600 per facility for customer success. These are commercial hypotheses to validate—not published pricing or a forecast. Fixed company costs are excluded.</p>
      </div>
    </div>
  </section>;
}
