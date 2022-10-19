function render(digits) {
    document.querySelector('.graph-div').innerHTML = ''
    var graph = Viva.Graph.graph();
    var numbers = [];
    var node1 = graph.addNode(1, { label: 1 });
    node1.isPinned = true;
    numbers[1] = true;

    limit = digits;
    for (let i = 1; i <= limit; i++) {
        if (numbers[i]) continue;
        numbers[i] = true;
        graph.addNode(i, { label: i });

        let oldN = i;
        let newN = i % 2 ? 3 * i + 1 : i / 2;
        while (!numbers[newN]) {
            if (!numbers[newN]) {
                graph.addNode(newN, { label: newN });
                numbers[newN] = true;
            };
            graph.addLink(oldN, newN);

            oldN = newN;
            newN = oldN % 2 ? 3 * oldN + 1 : oldN / 2
        }
        if (numbers[newN]) {
            graph.addLink(oldN, newN);
        }
    }

    var graphics = Viva.Graph.View.svgGraphics()
        .node(function (node) {
            return Viva.Graph.svg('g').append(
                Viva.Graph.svg("text")
                    .attr("y", "10")
                    .attr("x", "0")
                    .text(node.data.label)
            )
        });

    var layout = Viva.Graph.Layout.forceDirected(graph, {
        springLength: 5,
        springCoeff: 0.0005,
        dragCoeff: 0.02,
        gravity: -1.2
    });
    var renderer = Viva.Graph.View.renderer(graph, {
        graphics: graphics,
        layout: layout,
        container: document.querySelector('.graph-div')
    });
    renderer.run();
}

document.querySelector('#limit').addEventListener("input", (event)=>{
    render(event.target.value)
})

render(10)