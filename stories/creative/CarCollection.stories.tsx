import type { Meta, StoryObj } from "@storybook/react";
import { CarCollection } from "@/components/creative/CarCollection";

const meta: Meta<typeof CarCollection> = {
  title: "Creative/CarCollection",
  component: CarCollection,
  parameters: { layout: "fullscreen", viewMode: { isCreative: true } },
};

export default meta;

type Story = StoryObj<typeof CarCollection>;

export const Default: Story = {};

