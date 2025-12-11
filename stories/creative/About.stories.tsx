import type { Meta, StoryObj } from "@storybook/react";
import { About } from "@/components/creative/About";

const meta: Meta<typeof About> = {
  title: "Creative/About",
  component: About,
  parameters: { layout: "fullscreen", viewMode: { isCreative: true } },
};

export default meta;

type Story = StoryObj<typeof About>;

export const Default: Story = {};

