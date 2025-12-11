import type { Meta, StoryObj } from "@storybook/react";
import { WeekendVibes } from "@/components/creative/WeekendVibes";

const meta: Meta<typeof WeekendVibes> = {
  title: "Creative/WeekendVibes",
  component: WeekendVibes,
  parameters: { layout: "fullscreen", viewMode: { isCreative: true } },
};

export default meta;

type Story = StoryObj<typeof WeekendVibes>;

export const Default: Story = {};

