import type { Meta, StoryObj } from "@storybook/react";
import { SectionShell } from "@/components/SectionShell";

const meta: Meta<typeof SectionShell> = {
  title: "App/SectionShell",
  component: SectionShell,
  args: {
    label: "// Demo Section",
    children: (
      <div className="text-[var(--text-main)] text-lg">
        Section content goes here.
      </div>
    ),
  },
  parameters: { layout: "fullscreen" },
};

export default meta;

type Story = StoryObj<typeof SectionShell>;

export const Default: Story = {};

