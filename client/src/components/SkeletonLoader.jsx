export default function SkeletonLoader({ type = 'card', count = 1 }) {
  const cards = Array.from({ length: count });

  if (type === 'card') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map((_, i) => (
          <div key={i} className="rounded-2xl overflow-hidden">
            <div className="skeleton aspect-[3/4] rounded-2xl" />
          </div>
        ))}
      </div>
    );
  }

  if (type === 'text') {
    return (
      <div className="space-y-3">
        {cards.map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="skeleton h-4 rounded-full w-3/4" />
            <div className="skeleton h-4 rounded-full w-1/2" />
            <div className="skeleton h-4 rounded-full w-5/6" />
          </div>
        ))}
      </div>
    );
  }

  if (type === 'blog') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((_, i) => (
          <div key={i} className="rounded-2xl overflow-hidden">
            <div className="skeleton aspect-[16/10] rounded-t-2xl" />
            <div className="p-5 space-y-3 bg-white dark:bg-dark-card rounded-b-2xl">
              <div className="skeleton h-3 rounded-full w-1/4" />
              <div className="skeleton h-5 rounded-full w-3/4" />
              <div className="skeleton h-3 rounded-full w-full" />
              <div className="skeleton h-3 rounded-full w-2/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return null;
}
