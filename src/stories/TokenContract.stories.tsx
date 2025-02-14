import type { Meta, StoryObj, StoryFn } from '@storybook/react'
import { TokenContract } from '../components/TokenContract'
import { ThirdwebProvider } from '../components/providers/ThirdwebProvider'

const meta: Meta<typeof TokenContract> = {
  title: 'Components/TokenContract',
  component: TokenContract,
  decorators: [
    (Story: StoryFn) => (
      <ThirdwebProvider>
        <Story />
      </ThirdwebProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof TokenContract>

export const Default: Story = {
  args: {
    onSuccess: () => console.log('Token deployed successfully'),
    onError: (error: Error) => console.error('Deployment failed:', error),
  },
}

export const Loading: Story = {
  args: {
    ...Default.args,
  },
  parameters: {
    mockData: {
      isLoading: true,
    },
  },
}

export const Error: Story = {
  args: {
    ...Default.args,
  },
  parameters: {
    mockData: {
      error: 'Failed to deploy token: Insufficient funds',
    },
  },
} 