import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "අප ගැන"
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <p className="text-sm font-semibold text-blush">රෝස අකුරු</p>
      <h1 className="mt-3 text-4xl font-bold">සිංහල ආදර කවි සඳහා නිහඬ අවකාශයක්</h1>
      <div className="mt-8 space-y-6 text-lg leading-9 text-white/70">
        <p>අකුරකට හැඟීමක් ඇත. රෝස අකුරු ඒ හැඟීම් සුරකින්නේ කියවීමට පහසු, ලස්සන, සිංහල-first අත්දැකීමක් තුළය.</p>
        <p>මෙම වේදිකාව කවි ලිවීම, පළ කිරීම, ප්‍රතිචාර ලබා ගැනීම සහ පාඨක අදහස් කළමනාකරණය කිරීම සඳහා නිර්මාණය කර ඇත.</p>
      </div>
    </main>
  );
}
