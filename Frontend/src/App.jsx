import React, { useEffect, useState } from "react";
import "prismjs/themes/prism-tomorrow.css";
import prismjs from "prismjs";
import Editor from "react-simple-code-editor";
import axios from "axios";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

const App = () => {
  const [code, setCode] = useState(`function sum(a, b) {
  return a + b;
}`);
  const [review, setReview] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const reviewCode = async () => {
    setIsLoading(true);
    setReview("");
    try {
      const response = await axios.post("http://localhost:3000/ai/get-review", { code });
      setReview(response.data);
    } catch (e) {
      setReview("⚠️ Unable to get review. Check your server or console.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    prismjs.highlightAll();
  });

  return (
    <div className="min-h-screen w-full relative text-white font-sans overflow-hidden">
      {/* Animated background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-fuchsia-500/20 blur-3xl animate-float" />
        <div className="absolute top-1/4 -right-24 h-[28rem] w-[28rem] rounded-full bg-cyan-500/20 blur-3xl animate-float-slow" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-violet-400/10 blur-3xl animate-float-delayed" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(13,17,23,0.9),rgba(13,17,23,1))]" />
      </div>

      {/* Animations + scrollbar styles */}
      <style>{`
        @keyframes float { 0%,100%{ transform: translateY(0px) } 50%{ transform: translateY(-12px) } }
        @keyframes floatSlow { 0%,100%{ transform: translateY(0px) } 50%{ transform: translateY(16px) } }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-slow { animation: floatSlow 10s ease-in-out infinite; }
        .animate-float-delayed { animation: float 8s ease-in-out infinite 1.2s; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Hero text */}
      <section className="px-6 pt-8 pb-6 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          Make your code <span className="bg-gradient-to-r from-fuchsia-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">cleaner, faster, safer</span>.
        </h2>
        <p className="text-sm text-gray-300 mt-2">
          Paste your code on the left. Get actionable AI feedback on the right.
        </p>
      </section>

      {/* Main layout */}
      <main className="container mx-auto px-6 pb-10">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left: Editor */}
          <div className="rounded-2xl p-4 bg-white/5 border border-white/10 shadow-2xl backdrop-blur flex flex-col h-[80vh]">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-300">Your Code</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigator.clipboard.writeText(code)}
                  className="text-xs px-2 py-1 rounded-md bg-white/10 hover:bg-white/20 transition"
                >
                  Copy
                </button>
                <button
                  onClick={() =>
                    setCode(`/**
 * Calculates the sum of two numbers.
 */
function sum(a, b) {
  return a + b;
}
`)
                  }
                  className="text-xs px-2 py-1 rounded-md bg-white/10 hover:bg-white/20 transition"
                >
                  Sample
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-hidden rounded-xl border border-white/10 bg-[#0D1117]">
              <Editor
                value={code}
                onValueChange={setCode}
                highlight={(c) => prismjs.highlight(c, prismjs.languages.js, "js")}
                padding={14}
                style={{
                  fontFamily: '"Fira Code", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace',
                  fontSize: 15,
                  height: "100%",
                  width: "100%",
                  outline: "none",
                }}
              />
            </div>
            <div className="mt-3 flex justify-end">
              <button
                onClick={reviewCode}
                disabled={isLoading}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 disabled:opacity-60 transition shadow-lg shadow-violet-600/30"
              >
                {isLoading ? "Reviewing..." : "Run Review"}
              </button>
            </div>
          </div>

          {/* Right: Review */}
          <div className="rounded-2xl p-4 bg-white/5 border border-white/10 shadow-2xl backdrop-blur flex flex-col h-[80vh]">
            <h3 className="text-sm font-medium text-gray-300 mb-2">AI Code Review</h3>

            <div className="relative flex-1 overflow-auto rounded-xl border border-white/10 bg-[#0D1117] px-4 py-3 scrollbar-hide">
              {isLoading && (
                <div className="absolute inset-0 grid place-items-center">
                  <div className="text-center">
                    <div className="text-2xl mb-2">🤖</div>
                    <div className="text-base font-medium">AI is thinking</div>
                    <div className="mt-1 text-sm text-gray-400 flex items-center justify-center gap-1">
                      <span className="animate-pulse">•</span>
                      <span className="animate-pulse [animation-delay:.15s]">•</span>
                      <span className="animate-pulse [animation-delay:.3s]">•</span>
                    </div>
                  </div>
                </div>
              )}

              {!isLoading && !review && (
                <div className="absolute inset-0 grid place-items-center text-center px-6">
                  <p className="text-gray-300">No review yet.</p>
                  <p className="text-gray-400 text-sm mt-1">
                    Click <span className="text-white/80 font-medium">Run Review</span> to analyze your code.
                  </p>
                </div>
              )}

              {!isLoading && !!review && (
                <Markdown rehypePlugins={[rehypeHighlight]}>
                  {review}
                </Markdown>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
