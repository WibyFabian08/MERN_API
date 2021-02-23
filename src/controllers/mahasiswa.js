exports.getMahasiswa = (req, res, next) => {
    res.json([
        {
            message: "List Mahasiswa",
            data: [
                {
                    id: '1',
                    name: "Wiby",
                    jurusan: "Teknik Informatika"
                },
                {
                    id: 2,
                    name: "Fabian",
                    jurusan: "Teknik Sipil"
                }
            ]
        }
    ])
}
