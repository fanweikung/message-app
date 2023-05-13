it('should multiply 2 by 6', () => {
    expect(myFunction(2, 6)).toBe(12)
})

function myFunction (x, y) {
    return x * y
}