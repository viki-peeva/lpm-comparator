import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PetriNetSkeleton } from '@/components/PetriNetSkeleton';
import axios from 'axios';
import { ReactSVG } from 'react-svg';
import { LocalProcessModel } from '@/types/Report';

export default function LPMDialog({
  side,
  setSide,
  selectedLpm,
  setSelectedLpm,
  lpms_a,
  lpms_b
}:{
  side: 1 | 2;
  setSide: (side: 1 | 2) => void;
  selectedLpm: LocalProcessModel | null;
  setSelectedLpm: (lpm: LocalProcessModel | null) => void;
  lpms_a: LocalProcessModel[];
  lpms_b: LocalProcessModel[];
}) {
  const [vis, setVis] = useState<string | null>(null);
  const [similarLPMs, setSimilarLPMs] = useState<Array<any>>([]);

  useEffect(() => {
    if (selectedLpm) {
      fetchImage();
      setSimilarLPMs([{lpm_id: "47f523a45215dcd4d922c01bad964937dcd021ecd12cb928d3191b0fc5d061fa", name: 'LPM 1', similarity: 0.5}, {lpm_id: "2", name: 'LPM 2', similarity: 0.4}]);
    }
    
  }, [selectedLpm]);

  const fetchImage = async () => {
    try {
      const response = await axios.get(`/api/petrinet/${side}/${selectedLpm?.id}`);
      setVis(response.data.vis);
    } catch (error) {
      console.error('Error fetching SVG:', error);
    }
  };

  const handleSimilarLPMClick = (lpm_id: string) => {
    let lpm : LocalProcessModel | null = null;

    if (side === 1){
      lpm = lpms_b.find((lpm) => lpm.id === lpm_id) || null;
    } else {
      lpm = lpms_a.find((lpm) => lpm.id === lpm_id) || null;
    }

    if (lpm) {
      const nextSide = side === 1 ? 2 : 1;
      setSide(nextSide);
      setVis(null);
      setSelectedLpm(lpm);
    }
  }


  const beforeInjection = (svg: SVGElement) => {
    svg.removeAttribute('width');
    svg.removeAttribute('height');

    if (!svg.getAttribute('viewBox')) {
      const width = svg.getAttribute('width') || '100';
      const height = svg.getAttribute('height') || '100';
      svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    }

    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', 'auto');
  };

  const color = side === 1 ? 'hsl(var(--chart-2))' : 'hsl(var(--chart-3))';
  const otherColor = side === 1 ? 'hsl(var(--chart-3))' : 'hsl(var(--chart-2))';

  return (
    <Dialog open={!!selectedLpm} onOpenChange={() => {setSelectedLpm(null); setVis(null);}}>
      <DialogContent className="max-w-[800px] w-full" style={{ border: `4px solid ${color} ` }}>
        <DialogHeader>
          <DialogTitle>{selectedLpm?.name}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <div className="my-4">
          {vis ? (
            <div className="svg-wrapper">
              <ReactSVG
                src={`data:image/svg+xml;utf8,${encodeURIComponent(vis)}`}
                beforeInjection={beforeInjection}
                className="w-full h-auto transition-transform duration-300 hover:scale-150"
              />
            </div>
          ) : (
            <PetriNetSkeleton />
          )}
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-1/2 space-y-2">
            <h3 className="text-lg font-semibold">Metrics</h3>
            <p>Fitness: {selectedLpm?.fitness.toFixed(4)}</p>
            <p>Precision: {selectedLpm?.precision.toFixed(4)}</p>
            <p>Coverage: {selectedLpm?.coverage.toFixed(4)}</p>
          </div>
          <div className="md:w-1/2">
            <h3 className="text-lg font-semibold">Most Similar Models</h3>
            <ScrollArea className="h-48">
              {similarLPMs.length > 0 ? (
                <ul className="space-y-2">
                  {similarLPMs.map((lpm) => (
                    <li
                      key={lpm.lpm_id}
                      className="flex items-center justify-between p-2 border rounded cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSimilarLPMClick(lpm.lpm_id)}
                      style={{ borderLeft: `2px solid ${otherColor} ` }}
                    >
                      <span>{lpm.name || `LPM ${lpm.lpm_id}`}</span>
                      <span className="text-sm text-gray-600">
                        Similarity: {lpm.similarity.toFixed(4)}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No similar models found.</p>
              )}
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}