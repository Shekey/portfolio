import type { Meta, StoryObj } from "@storybook/react";
import { Hero } from "@/components/creative/Hero";

const meta: Meta<typeof Hero> = {
  title: "Creative/Hero",
  component: Hero,
  parameters: { layout: "fullscreen", viewMode: { isCreative: true } },
};

export default meta;

type Story = StoryObj<typeof Hero>;

export const Default: Story = {};

