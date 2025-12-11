import type { Meta, StoryObj } from "@storybook/react";
import { LifeJourney } from "@/components/creative/LifeJourney";

const meta: Meta<typeof LifeJourney> = {
  title: "Creative/LifeJourney",
  component: LifeJourney,
  parameters: { layout: "fullscreen", viewMode: { isCreative: true } },
};

export default meta;

type Story = StoryObj<typeof LifeJourney>;

export const Default: Story = {};

