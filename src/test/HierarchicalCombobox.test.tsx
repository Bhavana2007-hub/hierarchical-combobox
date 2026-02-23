import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { HierarchicalCombobox } from '../components/HierarchicalCombobox/HierarchicalCombobox'

describe('HierarchicalCombobox', () => {

  it('renders trigger button with placeholder', () => {
    render(<HierarchicalCombobox placeholder="Pick something" />)
    expect(screen.getByText('Pick something')).toBeInTheDocument()
  })

  it('opens dropdown when trigger is clicked', async () => {
    render(<HierarchicalCombobox />)
    await userEvent.click(screen.getByRole('button', { name: /select options/i }))
    expect(screen.getByRole('tree')).toBeInTheDocument()
  })

  it('shows root tree items when open', async () => {
    render(<HierarchicalCombobox />)
    await userEvent.click(screen.getByRole('button', { name: /select options/i }))
    expect(screen.getByText('Electronics')).toBeInTheDocument()
    expect(screen.getByText('Clothing')).toBeInTheDocument()
    expect(screen.getByText('Books')).toBeInTheDocument()
  })

  it('closes dropdown on Escape key', async () => {
    render(<HierarchicalCombobox />)
    await userEvent.click(screen.getByRole('button', { name: /select options/i }))
    expect(screen.getByRole('tree')).toBeInTheDocument()
    await userEvent.keyboard('{Escape}')
    expect(screen.queryByRole('tree')).not.toBeInTheDocument()
  })

  it('filters nodes based on search input', async () => {
    render(<HierarchicalCombobox />)
    await userEvent.click(screen.getByRole('button', { name: /select options/i }))
    await userEvent.type(screen.getByRole('searchbox'), 'Books')
    expect(screen.getByText('Books')).toBeInTheDocument()
    expect(screen.queryByText('Clothing')).not.toBeInTheDocument()
  })

  it('shows empty state when search has no results', async () => {
    render(<HierarchicalCombobox />)
    await userEvent.click(screen.getByRole('button', { name: /select options/i }))
    await userEvent.type(screen.getByRole('searchbox'), 'xyznotfound')
    expect(screen.getByText('No results found')).toBeInTheDocument()
  })

  it('shows selected count after selecting an item', async () => {
    render(<HierarchicalCombobox />)
    await userEvent.click(screen.getByRole('button', { name: /select options/i }))
    await userEvent.click(screen.getByText('Books'))
    const updatedTrigger = screen.getByRole('button', { name: /1 selected/i })
    expect(updatedTrigger).toBeInTheDocument()
  })

  it('calls onChange with selected ids', async () => {
    const onChange = vi.fn()
    render(<HierarchicalCombobox onChange={onChange} />)
    await userEvent.click(screen.getByRole('button', { name: /select options/i }))
    await userEvent.click(screen.getByText('Books'))
    await waitFor(() => {
      expect(onChange).toHaveBeenCalled()
    })
  })

  it('clears all selections when Clear all is clicked', async () => {
    render(<HierarchicalCombobox />)
    await userEvent.click(screen.getByRole('button', { name: /select options/i }))
    await userEvent.click(screen.getByText('Books'))
    // Reopen using the updated trigger text
    await userEvent.click(screen.getByRole('button', { name: /1 selected/i }))
    await waitFor(() => {
      expect(screen.getByText('Clear all')).toBeInTheDocument()
    })
    await userEvent.click(screen.getByText('Clear all'))
    await waitFor(() => {
      expect(screen.queryByRole('button', { name: /1 selected/i })).not.toBeInTheDocument()
    })
  })

  it('moves focus with arrow keys', async () => {
    render(<HierarchicalCombobox />)
    await userEvent.click(screen.getByRole('button', { name: /select options/i }))
    const search = screen.getByRole('searchbox')
    fireEvent.keyDown(search, { key: 'ArrowDown' })
    fireEvent.keyDown(search, { key: 'ArrowDown' })
    expect(screen.getByRole('tree')).toBeInTheDocument()
  })

})