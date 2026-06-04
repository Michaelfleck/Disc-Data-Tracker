import { user, holeStruggle } from "@/lib/data";
import { Panel, LinkMore, NoteRight } from "./ui";
import { TopoField } from "./TopoField";
import { Header } from "./Header";
import { HeroStats } from "./HeroStats";
import { TrendChart } from "./TrendChart";
import { TopCourses } from "./TopCourses";
import { BestWorst } from "./BestWorst";
import { HoleStruggle } from "./HoleStruggle";
import { RivalryStrip } from "./RivalryStrip";
import { RecentRounds } from "./RecentRounds";
import { ShouldIPlay } from "./ShouldIPlay";
import { PlayWindows, RestPerf } from "./SplitStats";
import { PathToLevel } from "./PathToLevel";

export function Dashboard() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-bg font-body text-fg">
      <div
        className="pointer-events-none absolute left-1/2 top-[-160px] h-[360px] w-[900px] -translate-x-1/2 opacity-55"
        style={{ background: "radial-gradient(ellipse, var(--accent-soft), transparent 70%)" }}
      />
      <TopoField />

      <div className="relative mx-auto flex max-w-dash flex-col gap-[22px] px-8 pb-11 pt-[26px]">
        <Header />

        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.08em] text-mute">
              Tuesday · June 2 · {user.home}
            </div>
            <h1 className="dg-headline">
              You&rsquo;re <span className="italic text-accent">heating up</span>, Michael.
            </h1>
          </div>
          <div className="max-w-[270px] text-right text-[13px] leading-relaxed text-dim">
            Last 5 rounds are your best stretch since April. Three rivals haven&rsquo;t beaten you this month.
          </div>
        </div>

        <HeroStats />

        <Panel title="Score Trend" kicker="Last 30 rounds · vs par" action={<NoteRight>lower is better ↑</NoteRight>} pad="p-[22px]">
          <TrendChart />
        </Panel>

        <div className="grid grid-cols-2 gap-[18px]">
          <Panel title="Most Played" kicker="Your rotation" action={<LinkMore />}>
            <TopCourses />
          </Panel>
          <Panel title="Course Form" kicker="Rating vs your average">
            <BestWorst />
          </Panel>
        </div>

        <Panel
          title="Hole Struggle Spotlight"
          kicker={`${holeStruggle.course} · ${holeStruggle.layout}`}
          action={<NoteRight>avg over par · last 12 plays</NoteRight>}
        >
          <HoleStruggle />
        </Panel>

        <Panel title="Rivalry Tracker" kicker="Head-to-head" action={<LinkMore>All rivals</LinkMore>}>
          <RivalryStrip />
        </Panel>

        <div className="grid grid-cols-[1.55fr_1fr] gap-[18px]">
          <Panel title="Recent Rounds" kicker="Last 10" action={<LinkMore />}>
            <RecentRounds />
          </Panel>
          <Panel title="Should I Play Today?" kicker="Charlotte, NC">
            <ShouldIPlay />
          </Panel>
        </div>

        <div className="grid grid-cols-2 gap-[18px]">
          <Panel title="When Do You Play Best?" kicker="Avg vs par · by time of day">
            <PlayWindows />
          </Panel>
          <Panel title="Rest vs Performance" kicker="Avg vs par · by days off">
            <RestPerf />
          </Panel>
        </div>

        <Panel title="Your Path to the Next Level" kicker="Player rating progression" pad="p-6">
          <PathToLevel />
        </Panel>
      </div>
    </div>
  );
}
