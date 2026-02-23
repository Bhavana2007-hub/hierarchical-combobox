import { HierarchicalCombobox } from './components/HierarchicalCombobox/HierarchicalCombobox';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-start justify-center pt-20 px-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">
          Hierarchical Combobox
        </h1>
        <HierarchicalCombobox
          placeholder="Select categories..."
          onChange={(ids) => console.log('Selected:', ids)}
        />
      </div>
    </div>
  );
}

export default App;