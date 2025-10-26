import { RepXLogo, RepXLogoCompact, RepXIcon } from '../components/RepXLogo';

export function LogoShowcase() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold mb-4 text-center">RepX Logo Variations</h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 text-center mb-16">
          Modern, catchy logo designs for RepX reputation management
        </p>

        {/* Full Logo */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8">Full Logo (with text)</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass-morphism rounded-2xl p-12 flex items-center justify-center bg-white dark:bg-slate-900">
              <RepXLogo className="w-16 h-16" showText={true} />
            </div>
            <div className="glass-morphism rounded-2xl p-12 flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-600">
              <div className="scale-150">
                <RepXLogo className="w-16 h-16" showText={true} />
              </div>
            </div>
          </div>
        </section>

        {/* Animated Logo */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8">Animated Logo</h2>
          <div className="glass-morphism rounded-2xl p-12 flex items-center justify-center bg-gradient-to-br from-slate-50 to-purple-50 dark:from-slate-900 dark:to-purple-950">
            <RepXLogo className="w-20 h-20" showText={true} animated={true} />
          </div>
        </section>

        {/* Logo Sizes */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8">Logo Sizes</h2>
          <div className="glass-morphism rounded-2xl p-12">
            <div className="flex flex-wrap items-end justify-around gap-8">
              <div className="text-center">
                <RepXLogo className="w-8 h-8" showText={false} />
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Small (32px)</p>
              </div>
              <div className="text-center">
                <RepXLogo className="w-12 h-12" showText={false} />
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Medium (48px)</p>
              </div>
              <div className="text-center">
                <RepXLogo className="w-16 h-16" showText={false} />
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Large (64px)</p>
              </div>
              <div className="text-center">
                <RepXLogo className="w-24 h-24" showText={false} />
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">XL (96px)</p>
              </div>
            </div>
          </div>
        </section>

        {/* Compact Logo */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8">Compact Logo (for small spaces)</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-morphism rounded-2xl p-8 flex items-center justify-center">
              <RepXLogoCompact className="w-12 h-12" />
            </div>
            <div className="glass-morphism rounded-2xl p-8 flex items-center justify-center">
              <RepXLogoCompact className="w-16 h-16" />
            </div>
            <div className="glass-morphism rounded-2xl p-8 flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-600">
              <RepXLogoCompact className="w-20 h-20" />
            </div>
          </div>
        </section>

        {/* Icon Only */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8">Icon Only (for favicons & app icons)</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="glass-morphism rounded-2xl p-8 flex items-center justify-center">
              <RepXIcon className="w-16 h-16" />
            </div>
            <div className="glass-morphism rounded-2xl p-8 flex items-center justify-center">
              <RepXIcon className="w-20 h-20" />
            </div>
            <div className="glass-morphism rounded-2xl p-8 flex items-center justify-center bg-slate-900">
              <RepXIcon className="w-24 h-24" />
            </div>
            <div className="glass-morphism rounded-2xl p-8 flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-600">
              <RepXIcon className="w-24 h-24" />
            </div>
          </div>
        </section>

        {/* Usage Examples */}
        <section>
          <h2 className="text-3xl font-bold mb-8">Usage Examples</h2>
          <div className="space-y-6">
            <div className="glass-morphism rounded-2xl p-6">
              <h3 className="font-semibold mb-4">Navigation Bar</h3>
              <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 flex items-center justify-between">
                <RepXLogo className="w-10 h-10" showText={true} />
                <div className="flex gap-4 text-sm">
                  <a href="#" className="text-slate-600 dark:text-slate-400">Features</a>
                  <a href="#" className="text-slate-600 dark:text-slate-400">Pricing</a>
                  <a href="#" className="text-slate-600 dark:text-slate-400">Contact</a>
                </div>
              </div>
            </div>

            <div className="glass-morphism rounded-2xl p-6">
              <h3 className="font-semibold mb-4">App Icon Style</h3>
              <div className="flex gap-4">
                <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl p-4 shadow-lg">
                  <RepXIcon className="w-16 h-16" />
                </div>
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl">
                  <RepXIcon className="w-20 h-20" />
                </div>
              </div>
            </div>

            <div className="glass-morphism rounded-2xl p-6">
              <h3 className="font-semibold mb-4">Loading Screen</h3>
              <div className="bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 rounded-lg p-12 flex items-center justify-center">
                <RepXLogo className="w-24 h-24" showText={true} animated={true} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
