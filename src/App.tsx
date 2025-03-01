import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Textarea } from './components/ui/textarea';
import { Button } from './components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { Download, FileDown } from 'lucide-react';
import ScoutNamePlaque from './components/ScoutNamePlaque';
import RankPlaque from './components/RankPlaque';

function App() {
  // Scout Name Plaque State
  const [packInfo, setPackInfo] = useState({
    pack: '',
    council: '',
    town: '',
  });
  const [scoutNames, setScoutNames] = useState('');
  const [namePreviewIndex, setNamePreviewIndex] = useState(0);
  
  // Rank Plaque State
  const [rankInfo, setRankInfo] = useState({
    rank: 'Tiger',
    year: new Date().getFullYear().toString(),
  });

  // Handle input changes for pack info
  const handlePackInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPackInfo(prev => ({ ...prev, [name]: value }));
  };

  // Parse scout names from textarea
  const parsedScoutNames = scoutNames
    .split('\n')
    .map(name => name.trim())
    .filter(name => name.length > 0);

  // Generate SVG for scout name plaque
  const generateNamePlaqueSVG = (scoutName: string) => {
    return (
      <ScoutNamePlaque
        scoutName={scoutName}
        pack={packInfo.pack}
        council={packInfo.council}
        town={packInfo.town}
      />
    );
  };

  // Generate SVG for rank plaque
  const generateRankPlaqueSVG = () => {
    return (
      <RankPlaque
        rank={rankInfo.rank}
        year={rankInfo.year}
      />
    );
  };

  // Download SVG function
  const downloadSVG = (svgEl: SVGSVGElement | null, fileName: string) => {
    if (!svgEl) return;
    
    const svgData = new XMLSerializer().serializeToString(svgEl);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const svgUrl = URL.createObjectURL(svgBlob);
    
    const downloadLink = document.createElement('a');
    downloadLink.href = svgUrl;
    downloadLink.download = fileName;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(svgUrl);
  };

  // Download all name plaques as a zip
  const downloadAllNamePlaques = () => {
    parsedScoutNames.forEach((name, index) => {
      const svgEl = document.getElementById(`scout-plaque-${index}`) as SVGSVGElement;
      downloadSVG(svgEl, `${name.replace(/\s+/g, '_')}_plaque.svg`);
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-blue-800">Scout Plaque Generator</h1>
          <p className="text-gray-600 mt-2">Create SVG files for laser engraving scout plaques</p>
        </header>

        <Tabs defaultValue="name-plaques" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="name-plaques">Scout Name Plaques</TabsTrigger>
            <TabsTrigger value="rank-plaques">Rank Plaques</TabsTrigger>
          </TabsList>

          <TabsContent value="name-plaques">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Pack Information</CardTitle>
                  <CardDescription>
                    Enter the details that will appear on all name plaques
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="pack">Pack Number</Label>
                    <Input 
                      id="pack" 
                      name="pack" 
                      placeholder="e.g. Pack 123" 
                      value={packInfo.pack}
                      onChange={handlePackInfoChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="council">Council Name</Label>
                    <Input 
                      id="council" 
                      name="council" 
                      placeholder="e.g. Golden Empire Council" 
                      value={packInfo.council}
                      onChange={handlePackInfoChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="town">Town/City</Label>
                    <Input 
                      id="town" 
                      name="town" 
                      placeholder="e.g. Sacramento, CA" 
                      value={packInfo.town}
                      onChange={handlePackInfoChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="scouts">Scout Names (one per line)</Label>
                    <Textarea 
                      id="scouts" 
                      placeholder="John Smith&#10;Jane Doe&#10;..." 
                      className="min-h-[150px]"
                      value={scoutNames}
                      onChange={(e) => setScoutNames(e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Preview</CardTitle>
                    <CardDescription>
                      {parsedScoutNames.length > 0 
                        ? `Showing plaque ${namePreviewIndex + 1} of ${parsedScoutNames.length}` 
                        : "Enter scout names to see previews"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center">
                    {parsedScoutNames.length > 0 ? (
                      <>
                        <div className="border border-gray-200 p-4 bg-white w-full overflow-auto">
                          {generateNamePlaqueSVG(parsedScoutNames[namePreviewIndex])}
                        </div>
                        
                        {parsedScoutNames.length > 1 && (
                          <div className="flex justify-between w-full mt-4">
                            <Button 
                              variant="outline" 
                              onClick={() => setNamePreviewIndex(prev => 
                                prev > 0 ? prev - 1 : parsedScoutNames.length - 1
                              )}
                            >
                              Previous
                            </Button>
                            <Button 
                              variant="outline" 
                              onClick={() => setNamePreviewIndex(prev => 
                                prev < parsedScoutNames.length - 1 ? prev + 1 : 0
                              )}
                            >
                              Next
                            </Button>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        Enter scout names to preview plaques
                      </div>
                    )}
                  </CardContent>
                </Card>

                <div className="flex flex-col space-y-2">
                  {parsedScoutNames.length > 0 && (
                    <>
                      <Button 
                        onClick={() => {
                          const svgEl = document.getElementById(`scout-plaque-${namePreviewIndex}`) as SVGSVGElement;
                          downloadSVG(svgEl, `${parsedScoutNames[namePreviewIndex].replace(/\s+/g, '_')}_plaque.svg`);
                        }}
                        className="w-full"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download Current Plaque
                      </Button>
                      
                      {parsedScoutNames.length > 1 && (
                        <Button 
                          onClick={downloadAllNamePlaques}
                          variant="outline"
                          className="w-full"
                        >
                          <FileDown className="mr-2 h-4 w-4" />
                          Download All Plaques
                        </Button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Hidden SVGs for all scouts (for download functionality) */}
            <div className="hidden">
              {parsedScoutNames.map((name, index) => (
                <div key={index} id={`scout-plaque-${index}`}>
                  {generateNamePlaqueSVG(name)}
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="rank-plaques">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Rank Information</CardTitle>
                  <CardDescription>
                    Select the rank and year for the plaque
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="rank">Scout Rank</Label>
                    <Select 
                      value={rankInfo.rank} 
                      onValueChange={(value) => setRankInfo(prev => ({ ...prev, rank: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a rank" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Tiger">Tiger</SelectItem>
                        <SelectItem value="Wolf">Wolf</SelectItem>
                        <SelectItem value="Bear">Bear</SelectItem>
                        <SelectItem value="Webelos">Webelos</SelectItem>
                        <SelectItem value="Arrow of Light">Arrow of Light</SelectItem>
                        <SelectItem value="Scout">Scout</SelectItem>
                        <SelectItem value="Tenderfoot">Tenderfoot</SelectItem>
                        <SelectItem value="Second Class">Second Class</SelectItem>
                        <SelectItem value="First Class">First Class</SelectItem>
                        <SelectItem value="Star">Star</SelectItem>
                        <SelectItem value="Life">Life</SelectItem>
                        <SelectItem value="Eagle">Eagle</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="year">Year</Label>
                    <Input 
                      id="year" 
                      name="year" 
                      type="number"
                      min="1900"
                      max="2100"
                      value={rankInfo.year}
                      onChange={(e) => setRankInfo(prev => ({ ...prev, year: e.target.value }))}
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Preview</CardTitle>
                    <CardDescription>
                      {rankInfo.rank} Rank Plaque for {rankInfo.year}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center">
                    <div className="border border-gray-200 p-4 bg-white w-full overflow-auto">
                      {generateRankPlaqueSVG()}
                    </div>
                  </CardContent>
                </Card>

                <Button 
                  onClick={() => {
                    const svgEl = document.getElementById('rank-plaque') as SVGSVGElement;
                    downloadSVG(svgEl, `${rankInfo.rank.replace(/\s+/g, '_')}_rank_plaque_${rankInfo.year}.svg`);
                  }}
                  className="w-full"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Rank Plaque
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default App;